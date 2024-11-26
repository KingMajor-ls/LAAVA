import os
import sys
import json
import constants
from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.document_loaders import UnstructuredFileLoader  # Updated import
from langchain.indexes import VectorstoreIndexCreator
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Chroma
import nltk

# Download NLTK 'punkt' tokenizer data (required for some text processing tasks)
nltk.download('punkt')

os.environ["OPENAI_API_KEY"] = constants.APIKEY

# Enable to save to disk & reuse the model (for repeated queries on the same data)
PERSIST = False
HISTORY_FILE = "chat_history.json"

query = None

# Check if command-line arguments are provided
if len(sys.argv) > 1:
    query = ' '.join(sys.argv[1:])

# Load existing chat history from file
def load_chat_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as file:
            return json.load(file)
    return []

# Save chat history to file
def save_chat_history(history):
    with open(HISTORY_FILE, "w") as file:
        json.dump(history, file)

# Format chat history for ConversationalRetrievalChain
def format_chat_history(history):
    formatted_history = []
    for q, r in history:
        formatted_history.append(("Human", q))
        formatted_history.append(("AI", r))
    return formatted_history

# Display the full chat history
def display_full_chat_history(history):
    print("\n--- Full Chat History ---")
    for i, (q, r) in enumerate(history):
        print(f"{i + 1}. You: {q}\n   Bot: {r}")
    print("--------------------------\n")

# Display the latest query and response
def display_latest_interaction(query, response):
    print(f" {response}\n")

chat_history = load_chat_history()

if PERSIST and os.path.exists("persist"):
    print("Reusing index...\n")
    vectorstore = Chroma(persist_directory="persist",
                         embedding_function=OpenAIEmbeddings())
    index = VectorStoreIndexWrapper(vectorstore=vectorstore)
else:
    # Use UnstructuredFileLoader to handle encoding issues automatically
    loader = UnstructuredFileLoader("data.txt")  # Updated loader

    if PERSIST:
        index = VectorstoreIndexCreator(
            vectorstore_kwargs={"persist_directory": "persist"},
            embedding=OpenAIEmbeddings()
        ).from_loaders([loader])
    else:
        index = VectorstoreIndexCreator(
            embedding=OpenAIEmbeddings()
        ).from_loaders([loader])

chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
)

fallback_llm = ChatOpenAI(model="gpt-3.5-turbo")  # For fallback responses

# Display the full chat history when no query is provided
if not query and chat_history:
    display_full_chat_history(chat_history)

# Only proceed if a query is provided
if query:
    # Format chat history for the chain
    formatted_chat_history = format_chat_history(chat_history)

    try:
        result = chain({"question": query, "chat_history": formatted_chat_history})
        response = result.get("answer", "").strip()
    except Exception as e:
        print(f"Error occurred in retrieval chain: {e}")
        response = None

    # Fallback to ChatGPT when no valid response is generated
    if not response:
        fallback_response = fallback_llm({"prompt": query})
        response = fallback_response['choices'][0]['message']['content']

    # Update and save the chat history
    chat_history.append((query, response))
    save_chat_history(chat_history)

    # Display only the latest query and response
    display_latest_interaction(query, response)
else:
    print("No query provided. Please input a question.")

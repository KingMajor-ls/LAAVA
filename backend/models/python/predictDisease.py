import sys
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model


def predict_image(img_path):
    # Load the saved model
    loaded_model = load_model('Tomato_disease_model')

    # Define your class labels
    class_labels = [
        'Tomato___Bacterial_spot',
        'Tomato___Early_blight',
        'Tomato___Late_blight',
        'Tomato___Leaf_Mold',
        'Tomato___Septoria_leaf_spot',
        'Tomato___Spider_mites Two-spotted_spider_mite',
        'Tomato___Target_Spot',
        'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
        'Tomato___Tomato_mosaic_virus',
        'Tomato___healthy'
    ]

    # Load and preprocess the image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize pixel values

    # Make predictions
    predictions = loaded_model.predict(img_array)

    # Print the probabilities with their corresponding labels
    print(f"Predictions for {img_path}:")
    for i, prob in enumerate(predictions[0]):
        print(f"   {class_labels[i]}: {prob:.4f}")

    # Find the index of the maximum value in the predictions array
    max_index = np.argmax(predictions)

    # Get the corresponding class label with the highest probability
    predicted_label = class_labels[max_index]

    return predicted_label


if __name__ == "__main__":
    # Check if image path is provided as a command-line argument
    if len(sys.argv) != 2:
        print("Usage: python predictDisease.py <image_path>")
        sys.exit(1)

    # Get the image path from the command-line argument
    img_path = sys.argv[1]

    # Call predict_image function with the provided image path
    prediction = predict_image(img_path)

    # Print the predicted label
    print(f"Predicted label: {prediction}")



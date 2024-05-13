# import sys
# from tensorflow.keras.preprocessing import image
# import numpy as np
# from tensorflow.keras.models import load_model

# # Load the saved model
# # Replace 'my_custom_model.h5' with the path to your saved model file
# # loaded_model = load_model('Soil_fertility_model')

# def predict_image(img_paths):
#     # Load the saved model
#     # Replace 'Soil_fertility_model' with the path to your saved model directory
#     loaded_model = load_model('Soil_fertility_model')

#     # Define your class labels
#     class_labels = [
#         'Alluvial soil',
#         'Black Soil',
#         'Clay soil',
#         'Red soil'
#     ]


#     # Initialize a list to store the predictions
#     all_predictions = []

#     # Loop through each image
#     for img_path in img_paths:
#         # Load and preprocess the image
#         img = image.load_img(img_path, target_size=(224, 224))
#         img_array = image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#         img_array = img_array / 255.0  # Normalize pixel values

#         # Make predictions
#         predictions = loaded_model.predict(img_array)

#         # Append the predictions to the list
#         all_predictions.append(predictions)

#     # Print the probabilities with their corresponding labels and image paths
#     for i, (predictions, img_path) in enumerate(zip(all_predictions, img_paths)):
#         print(f"Image {i+1} - {img_path}:")
#         for j, prob in enumerate(predictions[0]):
#             print(f"   {class_labels[j]}: {prob:.4f}")


# if __name__ == "__main__":
#     # Check if image paths are provided as command-line arguments
#     if len(sys.argv) < 2:
#         print("Usage: python predictSoil.py <image_path1> <image_path2> ...")
#         sys.exit(1)

#     # Get image paths from command-line arguments
#     img_paths = sys.argv[1:]

#     # Call predict_image function with the provided image paths
#     predict_image(img_paths)

import sys
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model


def predict_image(img_path):
    # Load the saved model
    loaded_model = load_model('Soil_fertility_model')

    # Define your class labels
    class_labels = [
        'Alluvial soil',
        'Black Soil',
        'Clay soil',
        'Red soil'
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
        print("Usage: python predictSoil.py <image_path>")
        sys.exit(1)

    # Get the image path from the command-line argument
    img_path = sys.argv[1]

    # Call predict_image function with the provided image path
    prediction = predict_image(img_path)

    # Print the predicted label
    print(f"Predicted label: {prediction}")

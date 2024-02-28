/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */

// const filename = "./image.jpg";

// const path = require('path');
// const filename = path.join(__dirname, 'image.jpg');



const endpointId = "2556331549230366720";
const project = 'sustained-path-412608';
const location = 'us-central1';
const aiplatform = require('@google-cloud/aiplatform');
const {instance, params, prediction} = aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

// Imports the Google Cloud Prediction Service Client library
const {PredictionServiceClient} = aiplatform.v1;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function predictImageObjectDetection(imagePath) {
  // Configure the endpoint resource
  const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

  const parametersObj = new params.ImageObjectDetectionPredictionParams({
    confidenceThreshold: 0.5,
    maxPredictions: 5,
  });
  const parameters = parametersObj.toValue();

  const fs = require('fs');
  const image = fs.readFileSync(imagePath, 'base64');
  const instanceObj = new instance.ImageObjectDetectionPredictionInstance({
    content: image,
  });

  const instanceVal = instanceObj.toValue();
  const instances = [instanceVal];
  const request = {
    endpoint,
    instances,
    parameters,
  };

  // Predict request
  const [response] = await predictionServiceClient.predict(request);

  console.log('Predict image object detection response');
  console.log(`\tDeployed model id : ${response.deployedModelId}`);
  const Array = [];
  const predictions = response.predictions;
  console.log('Predictions :');
  for (const predictionResultVal of predictions) {
    const predictionResultObj =
      prediction.ImageObjectDetectionPredictionResult.fromValue(
        predictionResultVal
      );
    
    for (const [i, label] of predictionResultObj.displayNames.entries()) {
      console.log(`\tDisplay name: ${label}`);
      console.log(`\tConfidences: ${predictionResultObj.confidences[i]}`);
      console.log(`\tIDs: ${predictionResultObj.ids[i]}`);
      console.log(`\tBounding boxes: ${predictionResultObj.bboxes[i]}\n\n`);

       const predictionInfo = {
        displayName: label,
        confidence: predictionResultObj.confidences[i],
        id: predictionResultObj.ids[i],
        boundingBox: predictionResultObj.bboxes[i],
      };
      Array.push(predictionInfo);
    }
  }
  return Array;
}
module.exports = { predictImageObjectDetection };




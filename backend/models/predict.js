
// const path = require('path');
// const { execSync } = require('child_process');

// function predictImageObjectDetection(imagePath) {
//   try {
//     const scriptDirectory = path.dirname(__filename);
//     process.chdir(scriptDirectory); // Set the working directory to the script's directory
//     const command = `python3 python/predictDisease.py "${imagePath}"`; // Use the image path as an argument
//     console.log('Executing command:', command);
//     const output = execSync(command, { encoding: 'utf-8' });
//     console.log('Script output:', output);
//     return output.trim();
//   } catch (error) {
//     console.error('Error:', error.stderr);
//     return 'Error occurred';
//   }
// }


// function predictImage(imagePath) {
//   try {
//     const scriptDirectory = path.dirname(__filename);
//     process.chdir(scriptDirectory); // Set the working directory to the script's directory
//     const command = `python3 python/predictSoil.py "${imagePath}"`; // Use the image path as an argument
//     console.log('Executing command:', command);
//     const output = execSync(command, { encoding: 'utf-8' });
//     console.log('Script output:', output);
//     return output.trim();
//   } catch (error) {
//     console.error('Error:', error.stderr);
//     return 'Error occurred';
//   }
// }

// module.exports = { predictImageObjectDetection, predictImage };

const path = require('path');
const { execSync } = require('child_process');

function predictImageObjectDetection(imagePath) {
  try {
    const scriptDirectory = path.dirname(__filename);
    process.chdir(scriptDirectory); // Set the working directory to the script's directory
    const command = `python3 python/predictDisease.py "${imagePath}"`; // Use the image path as an argument
    console.log('Executing command:', command);
    const output = execSync(command, { encoding: 'utf-8' });
    console.log('Script output:', output);
    // return output.trim();
    const lines = output.trim().split('\n');
    // Get the last line, which contains the predicted label
    const predictedLabel = lines[lines.length - 1].split(': ')[1].trim();

    return predictedLabel;
    
  } catch (error) {
    console.error('Error:', error.stderr);
    return 'Error occurred';
  }
}

function predictImage(imagePath) {
  try {
    const scriptDirectory = path.dirname(__filename);
    process.chdir(scriptDirectory); // Set the working directory to the script's directory
    const command = `python3 python/predictSoil.py "${imagePath}"`; // Use the image path as an argument
    console.log('Executing command:', command);
    const output = execSync(command, { encoding: 'utf-8' });
    console.log('Script output:', output);
    
    // Split the output by new lines
    const lines = output.trim().split('\n');
    // Get the last line, which contains the predicted label
    const predictedLabel = lines[lines.length - 1].split(': ')[1].trim();

    return predictedLabel;
  } catch (error) {
    console.error('Error:', error.stderr);
    return 'Error occurred';
  }
}

module.exports = { predictImageObjectDetection, predictImage };



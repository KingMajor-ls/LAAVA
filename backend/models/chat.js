const path = require('path');
const { execSync } = require('child_process');

function runChatModel(query) {
  try {
    const scriptDirectory = path.dirname(__filename);
    process.chdir(scriptDirectory); // Set the working directory to the script's directory
    const command = `python3 python/agriAI_assistant.py "${query}"`;
    console.log('Executing command:', command);
    const output = execSync(command, { encoding: 'utf-8' });
    console.log('Script output:', output);
    return output.trim();
  } catch (error) {
    console.error('Error:', error.stderr);
    return 'Error occurred';
  }
}

module.exports = { runChatModel };

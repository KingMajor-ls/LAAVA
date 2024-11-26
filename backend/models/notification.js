const path = require('path');
const { execSync } = require('child_process');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'laava_database',
  password: 'root',
  port: 5432,
});

const sendWhatsAppNotification = (message) => {
  try {
    const scriptDirectory = path.dirname(__filename);
    process.chdir(scriptDirectory);
    const command = `python3 python/test.py "${message}"`; // Replace recipient number
    console.log('Executing command:', command);
    const output = execSync(command, { encoding: 'utf-8' });
    console.log('Script output:', output);
    return output.trim();
  } catch (error) {
    console.error('Error:', error.stderr);
    return 'Error occurred';
  }
};

const getLatestSensorData = async () => {
  try {
    const query = 'SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1';
    const { rows } = await pool.query(query);
    return rows[0]; // Return only the latest entry
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    return null;
  }
};

const checkSoilMoistureAndSendNotification = async () => {
  try {
    const latestEntry = await getLatestSensorData();
    if (latestEntry && latestEntry.soil_moisture > 900) {
      const message = `Soil moisture is above 900 (${latestEntry.soil_moisture}) at ${latestEntry.timestamp}`;
      sendWhatsAppNotification(message);
    }
    else{
      const message = `Conditions are back to normal you can chill a while.`;
      sendWhatsAppNotification(message);
    }
  } catch (error) {
    console.error('Error checking soil moisture and sending notification:', error);
  }

};

// Call the function initially
checkSoilMoistureAndSendNotification();

// Set up an interval to check periodically (every minute)
const interval = setInterval(checkSoilMoistureAndSendNotification, 6000000); //60000

// Clear interval on process exit
process.on('exit', () => {
  clearInterval(interval);
});

module.exports = { checkSoilMoistureAndSendNotification };

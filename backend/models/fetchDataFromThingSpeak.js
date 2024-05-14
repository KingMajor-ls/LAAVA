// fetchDataFromThingSpeak.js

const axios = require('axios');
const { Pool } = require('pg');

// PostgreSQL database configuration
const pool = new Pool({
    user: 'postgres',  // Replace with your PostgreSQL username
    host: 'localhost',       // Use 'localhost' or '127.0.0.1' for local connections
    database: 'laava_database',
    password: 'root',  // Replace with your PostgreSQL password
    port: 5432,              // Default PostgreSQL port
});

// Function to fetch data from ThingSpeak and insert into PostgreSQL
async function fetchDataAndInsert() {
    try {
        // Fetch data from ThingSpeak
        const response = await axios.get(
            // `https://api.thingspeak.com/channels/2391728/feeds.json?api_key=RABUE3OO0HQ6YI59&results=1`
            'https://api.thingspeak.com/channels/2463386/feeds.json?api_key=JD8V8JT4LAS4TNHK&results=1'
        );
        
        console.log('ThingSpeak API Response:', response.data); // Log the entire response
        
        // Check if the response structure is valid
        if (response.data.feeds && response.data.feeds.length > 0) {
            // Extract temperature and humidity from the response
            const { field1, field2, field3 } = response.data.feeds[0];

            // Insert data into PostgreSQL database
            await pool.query(
                'INSERT INTO sensor_data (soil_moisture, temperature, humidity) VALUES ($1, $2, $3)',
                [parseFloat(field1), parseFloat(field2), parseFloat(field3)]
            );

            console.log('Data inserted successfully.');
        } else {
            console.error('Invalid response structure from ThingSpeak.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Set up an interval to fetch data every minute
const interval = setInterval(fetchDataAndInsert, 6000000);

// Close the PostgreSQL pool when the script is terminated
process.on('SIGINT', async () => {
    clearInterval(interval);
    await pool.end();
    process.exit();
});

module.exports = {
    fetchDataAndInsert,
};


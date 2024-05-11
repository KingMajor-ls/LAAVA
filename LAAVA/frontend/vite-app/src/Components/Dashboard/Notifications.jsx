import { useState, useEffect } from 'react';
import '../../Styles/Dashboard.css';

function NotificationTab() {
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        // Function to fetch sensor data and check soil moisture
        const checkSoilMoisture = async () => {
            try {
                const response = await fetch('http://localhost:8280/sensorData');
                if (!response.ok) {
                    throw new Error('Failed to fetch sensor data');
                }
                const sensorData = await response.json();
                const highMoistureEntries = sensorData.filter(entry => entry.soil_moisture > 900);
                if (highMoistureEntries.length > 0) {
                    setNotifications(highMoistureEntries.map((entry, index) => ({
                        id: index + 1,
                        message: `Soil moisture is above 900 (${entry.soil_moisture}) at ${new Date(entry.timestamp).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            timeZoneName: 'short',
                        })}`
                    })));
                } else {
                    setNotifications([]);
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
                setNotifications([]);
            }
        };

        // Call the function initially and then set up an interval to check periodically
        checkSoilMoisture();
        const interval = setInterval(checkSoilMoisture, 60000); // Check every minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="notification-container">
            <div className="notification-list"> 
                <h2 className='noti'>Notifications</h2>
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                            {notification.message}
                        </div>
                    ))
                ) : (
                    <p>No notifications</p>
                )}
            </div>
            <div className="crop-prices">
                <h2 className='prices'>Crop Prices</h2>
                {/* Add crop prices component or data here */}
<div className='price-list'>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>U/D</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cabbage Bag</td>
                <td>M100</td>
                <td>10%</td>
            </tr>
            <tr>
                <td>Tomato Box</td>
                <td>M120</td>
                <td>9%</td>
            </tr>
            <tr>
                <td>Beans 10kg</td>
                <td>M200</td>
                <td>5%</td>
            </tr>
            <tr>
                <td>Green Pepper Box</td>
                <td>M100</td>
                <td>-3%</td>
            </tr>
            <tr>
                <td>Water Melon Bag</td>
                <td>M100</td>
                <td>1%</td>
            </tr>
            <tr>
                <td>Onion Bag</td>
                <td>M120</td>
                <td>-6%</td>
            </tr>
            <tr>
                <td>Beetroot 10kg</td>
                <td>M200</td>
                <td>-10%</td>
            </tr>
            <tr>
                <td>Carrots 10kg</td>
                <td>M100</td>
                <td>6%</td>
            </tr>
        </tbody>
    </table>
</div>

            </div>
        </div>
    );
}

export default NotificationTab;


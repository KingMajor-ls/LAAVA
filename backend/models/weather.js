const axios = require("axios");

const getWeather = async (city) => {
  const apiKey = "6410d31791ca110a41e4aefb985ab013"; // Replace with your OpenWeatherMap API key
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  try {
    const response = await axios.get(APIUrl);
    const weather = response.data;
    return { weather, error: null };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return { weather: null, error: "Error, please try again" };
  }
};

module.exports = { getWeather };


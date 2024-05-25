import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";
import CloudyIcon from "./CloudyIcon";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "564cf8da8efd4ec781726f51c86fc58d";

  const handleFormSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("Unable to fetch weather data. Please check the city name.");
      setWeatherData(null);
    }
  };

  const getCurrentLocationWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );
          setWeatherData(response.data);
          setError(null);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setError("Unable to fetch weather data for current location.");
          setWeatherData(null);
        }
      );
    } catch (error) {
      console.error("Error getting location:", error.message);
      setError("Unable to fetch weather data for current location.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  return (
    <View>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
      />
      <Button title="Get Weather" onPress={handleFormSubmit} />
      {error && <Text>{error}</Text>}
      {weatherData && (
        <View>
          <Text>Weather in {weatherData.name}</Text>
          <CloudyIcon weatherDescription={weatherData.weather[0].description} />
          <Text>Temperature: {weatherData.main.temp}°C</Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
    </View>
  );
};

export default WeatherForm;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import axios from "axios";
import CloudyIcon from "./CloudyIcon";
import { useNavigation } from "@react-navigation/native";

const WeatherForm = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "";

  const handleFormSubmit = async () => {
    if (!city) {
      Alert.alert("Error", "Please enter a city name.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setCity(""); // Clear the city input
      setError(null);
      Keyboard.dismiss(); // Hide the keyboard
    } catch (error) {
      setError("Unable to fetch weather data. Please check the city name.");
      setWeatherData(null);
    }
  };

  const handleMenu = () => {
    navigation.navigate("Header");
  };

  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            );
            setWeatherData(response.data);
            setError(null);
          } catch (error) {
            setError("Unable to fetch weather data for current location.");
            setWeatherData(null);
          }
        },
        () => {
          setError("Geolocation permission denied or not available.");
        }
      );
    } else {
      /*    setError("Geolocation is not supported by this browser."); */
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = "0" + date.getUTCMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };

  const getLocalTime = (timezone) => {
    const date = new Date();
    const localTime = new Date(date.getTime() + timezone * 1000);
    const hours = localTime.getUTCHours();
    const minutes = "0" + localTime.getUTCMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.title}>Weather Information</Text>
      <View style={styles.form}>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMenu}>
            <Text style={styles.buttonText}>Go to Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherDataContainer}>
          <Text style={styles.weatherTitle}>Weather in {weatherData.name}</Text>
          <View style={styles.weatherInfoContainer}>
            <CloudyIcon
              style={styles.icon}
              weatherDescription={weatherData.weather[0].description}
            />
            <View style={styles.weatherDetails}>
              <Text style={styles.temperature}>
                Temperature: {weatherData.main.temp.toFixed(1)}°C
              </Text>
              <Text style={styles.weatherInfo}>
                Humidity: {weatherData.main.humidity}%
              </Text>
              <Text style={styles.weatherInfo}>
                Wind Speed: {weatherData.wind.speed} m/s
              </Text>
              <Text style={styles.weatherInfo}>
                Pressure: {weatherData.main.pressure} hPa
              </Text>
              <Text style={styles.weatherInfo}>
                Min Temperature: {weatherData.main.temp_min.toFixed(1)}°C
              </Text>
              <Text style={styles.weatherInfo}>
                Max Temperature: {weatherData.main.temp_max.toFixed(1)}°C
              </Text>
              <Text style={styles.weatherInfo}>
                Feels Like: {weatherData.main.feels_like.toFixed(1)}°C
              </Text>
              <Text style={styles.weatherInfo}>
                Sunrise:{" "}
                {weatherData.sys.sunrise &&
                  formatTime(weatherData.sys.sunrise, weatherData.timezone)}
              </Text>
              <Text style={styles.weatherInfo}>
                Sunset:{" "}
                {weatherData.sys.sunset &&
                  formatTime(weatherData.sys.sunset, weatherData.timezone)}
              </Text>
              <Text style={styles.weatherInfo}>
                Local Time: {getLocalTime(weatherData.timezone)}
              </Text>
              <Text style={styles.weatherDescription}>
                {weatherData.weather[0].description}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: "#f0f0f0",
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  form: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fafafa",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  weatherDataContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
    color: "#4CAF50",
  },
  weatherInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperature: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 10,
  },
  weatherDetails: {
    marginLeft: 10,
  },
  weatherInfo: {
    fontSize: 16,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WeatherForm;

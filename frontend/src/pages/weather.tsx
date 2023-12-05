import { useEffect, useState } from "react";

interface Weather {
  date: string;
  temperature: number;
  weatherIcon: string;
  title: string;
  description: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<Weather[] | null>(null);
  //Here we tell Typescript: trust us! this is an array of weather, but we aren't sure.

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          "https://reader.mindmingle.nl/api/exercises/react/weather"
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    getWeather();
  }, []);

  return (
    <main>
      <h1>Weather</h1>
      {weather &&
        weather.map((weather) => (
          <p key={weather.date}>
            {weather.weatherIcon} {weather.title}
          </p>
        ))}
    </main>
  );
};

export default Weather;

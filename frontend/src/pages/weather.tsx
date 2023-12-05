import { useEffect, useState } from "react";
import { z } from "zod";

// interface Weather {
//   date: string;
//   temperature: number;
//   weatherIcon: string;
//   title: string;
//   description: string;
// }

const weatherSchema = z
  .object({
    date: z.string(),
    temperature: z.number().int(),
    weatherIcon: z.string(),
    title: z.string(),
    description: z.string(),
  })
  .strict();

type Weather = z.infer<typeof weatherSchema>;
const weatherArray = z.array(weatherSchema);

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
        const validated = weatherArray.safeParse(data);
        if (validated.success) {
          setWeather(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
        // const data = await response.json();
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

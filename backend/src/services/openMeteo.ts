import { fetchWeatherApi } from 'openmeteo';
const params = {
  latitude: 0,
  longitude: 0,
  daily: ['temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset', 'sunshine_duration', 'daylight_duration'],
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'precipitation_probability',
    'wind_speed_10m',
    'wind_direction_10m'
  ],
  timezone: ''
};

export type openMetroDTO = {
  hourly: {
    time: Date[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
  };
  daily: {
    time: Date[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: Date[];
    sunset: Date[];
    sunshine_duration: number[];
    daylight_duration: number[];
  };
};

export async function openMeteo(
  latFixed: number,
  lonFixed: number,
  timezoneFixed = 'Europe/Berlin'
): Promise<openMetroDTO> {
  params.latitude = latFixed;
  params.longitude = lonFixed;
  params.timezone = timezoneFixed;

  const responses = await fetchWeatherApi(process.env.OPENMETRO_API_URL!, params);
  // Process first location.
  // a for-loop for multiple locations or weather models
  const response = responses[0] as any;
  console.log(responses);
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;
  const daily = response.daily()!;
  // Define Int64 variables so they can be processed accordingly
  const sunrise = daily.variables(2)!;
  const sunset = daily.variables(3)!;

  const weatherData = {
    hourly: {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      precipitation_probability: hourly.variables(2)!.valuesArray(),
      wind_speed_10m: hourly.variables(3)!.valuesArray(),
      wind_direction_10m: hourly.variables(4)!.valuesArray()
    },
    daily: {
      time: Array.from(
        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      // Map Int64 values to according structure
      sunrise: [...Array(sunrise.valuesInt64Length())].map(
        (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
      ),
      // Map Int64 values to according structure
      sunset: [...Array(sunset.valuesInt64Length())].map(
        (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
      ),
      sunshine_duration: daily.variables(4)!.valuesArray(),
      daylight_duration: daily.variables(5)!.valuesArray()
    }
  };
  return weatherData as openMetroDTO;
}

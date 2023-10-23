import { TUser } from "./user";

export type TLocation = {
  city: string;
  country: string;
  state: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  street: {
    name: string;
    number: number;
  };
};

export type TWeather = {
  current_weather: {
    interval: number;
    is_day: number;
    temperature: number;
    time: Date;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  };
  current_weather_units: {
    interval: string;
    is_day: string;
    temperature: string;
    time: string;
    weathercode: string;
    winddirection: string;
    windspeed: string;
  };
  hourly: {
    temperature_2m: Array<number>;
    time: Array<Date>;
  };
  hourly_units: {
    temperature_2m: string;
  };
};

export interface IWeather {
  open: boolean;
  onClose: () => void;
  hourly: {
    temperature_2m: Array<number>;
    time: Array<Date>;
  };
  type: string;
}

export type TWeatherData = {
  data: TWeather;
  loading: boolean;
};

export type TGetWeather = {
  open: boolean;
  location: TLocation;
};

import { TLocation, TWeather } from "./weather";

export type TUser = TWeather & {
  id: {
    name: string;
    value: string;
  };
  email: string;
  gender: "male" | "female";
  location: TLocation;
  picture: {
    large: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  isSaved?: boolean;
};

export type TUserResponse = {
  results: Array<TUser>;
};

export type TUserData = {
  data: Array<TUser>;
  loading: boolean;
  loadMore?: boolean;
  onLoad?: () => void;
  isSaved?: boolean;
};

import { useEffect, useState } from "react";
import { TUserResponse, TUserData, TUser } from "../types/user";
import { TLocation } from "../types/weather";

const SAVED_USERS = "SAVED_USERS";

export const useGetUsers = () => {
  const [usersData, setUsersData] = useState<TUserData>({
    data: [],
    loading: false,
    loadMore: false,
  });

  const getWeatherData = async (location: TLocation) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.coordinates.latitude}&longitude=${location.coordinates.longitude}&current_weather=true&hourly=temperature_2m`
    );
    const data: TUser = await response.json();
    return data;
  };

  const getUserData = async (isMore?: boolean) => {
    if (usersData.loading) return;
    try {
      setUsersData((prev) => ({
        ...prev,
        loading: true,
      }));

      const response = await fetch("https://randomuser.me/api/");
      const data: TUserResponse = await response.json();

      if (!data.results) return;

      const fullData = await Promise.all(
        data.results.map(async (user) => {
          const weather = await getWeatherData(user.location);
          return {
            ...user,
            ...weather,
          };
        })
      );

      if (!isMore) {
        return setUsersData({
          loading: false,
          loadMore: false,
          data: fullData,
        });
      }
      setUsersData((prev) => ({
        loading: false,
        loadMore: false,
        data: [...prev.data, ...fullData],
      }));
    } catch (error) {
      console.error(error);
      setUsersData((prev) => ({
        ...prev,
        loading: false,
        loadMore: false,
      }));
    }
  };

  const onUpdateWeatherData = async () => {
    const data = await Promise.all(
      usersData.data.map(async (user) => {
        const weather = await getWeatherData(user.location);
        return {
          ...user,
          ...weather,
        };
      })
    );
    setUsersData((prev) => ({ ...prev, data }));
  };

  const onLoad = () => {
    setUsersData((prev) => ({
      ...prev,
      loadMore: true,
    }));
    getUserData(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onUpdateWeatherData();
    }, 300000);
    return () => clearInterval(intervalId);
  }, [usersData.data]);

  return { ...usersData, onLoad };
};

export const useSetLocalData = () => {
  const [saved, setSaved] = useState(false);
  const setStorage = (user: TUser) => () => {
    setSaved(true);
    const usersData = localStorage.getItem(SAVED_USERS);

    if (usersData) {
      const usersList: Array<TUser> = JSON.parse(usersData);

      if (!!usersList.find((u) => u.id.value === user.id.value)) return;
      localStorage.setItem(SAVED_USERS, JSON.stringify([...usersList, user]));
    } else {
      localStorage.setItem(SAVED_USERS, JSON.stringify([user]));
    }
  };

  useEffect(() => {
    if (!saved) return;
    const timeoutId = setTimeout(() => {
      setSaved(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [saved]);

  return { setStorage, saved };
};

export const useGetLocalData = () => {
  const [usersData, setUsersData] = useState<TUserData>({
    data: [],
    loading: false,
    loadMore: false,
  });
  const getStorage = () => {
    setUsersData((prev) => ({ ...prev, loading: true }));
    const data = localStorage.getItem(SAVED_USERS);
    if (!data) return [];
    setUsersData((prev) => ({
      ...prev,
      data: JSON.parse(data),
      loading: false,
    }));
  };

  useEffect(() => {
    getStorage();
  }, []);

  return usersData;
};

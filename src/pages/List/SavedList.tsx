import React from "react";
import { useGetLocalData } from "../../hooks/user";
import { List } from "../../components/List";

export const SavedListPage: React.FC = () => {
  const data = useGetLocalData();
  return <List isSaved {...data} />;
};

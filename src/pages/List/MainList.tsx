import React from "react";
import { useGetUsers } from "../../hooks/user";
import { List } from "../../components/List";

export const MainListPage: React.FC = () => {
  const data = useGetUsers();
  return <List {...data} />;
};

import React, { useState } from "react";
import { TUser } from "../../../types/user";
import { Card, Avatar, Typography, Space, Button, Spin } from "antd";
import { SaveOutlined, BarChartOutlined } from "@ant-design/icons";
import { Weather } from "../../Weather";
import { useSetLocalData } from "../../../hooks/user";

export const CardComponent: React.FC<TUser> = ({ isSaved, ...user }) => {
  const {
    name,
    picture,
    location,
    email,
    gender,
    current_weather,
    current_weather_units,
    hourly,
  } = user;
  const [open, setOpen] = useState(false);
  const { setStorage, saved } = useSetLocalData();

  const fullName = `${name.title} ${name.first} ${name.last}`;
  const fullAddress = `${location.country}, ${location.city}, ${location.state}, ${location.street.name}, ${location.street.number}`;

  const changeOpenHandler = () => {
    return setOpen((prev) => !prev);
  };

  const min = hourly?.temperature_2m && Math.min(...hourly?.temperature_2m);
  const max = hourly?.temperature_2m && Math.max(...hourly?.temperature_2m);

  const actions = [
    <Button
      style={{ width: "80%" }}
      type="primary"
      size="large"
      icon={<BarChartOutlined key="weather" />}
      onClick={changeOpenHandler}
    >
      Weather
    </Button>,
  ];
  if (!isSaved) {
    actions.push(
      <Button
        disabled={saved}
        style={{ width: "80%" }}
        type="primary"
        size="large"
        icon={<SaveOutlined key="save" />}
        onClick={setStorage(user)}
      >
        {saved ? <Spin size="small" /> : "Save"}
      </Button>
    );
  }

  return (
    <Card
      hoverable
      style={{ width: "100%", maxWidth: 330 }}
      actions={actions}
      title={
        <Space direction="horizontal" align="center">
          <Avatar alt="avatar" src={picture.large} />
          <Typography.Text strong>
            {fullName}
            <Typography.Text type="secondary"> ({gender})</Typography.Text>
          </Typography.Text>
        </Space>
      }
    >
      <Space direction="vertical">
        <Typography.Text strong>{email}</Typography.Text>
        <Typography.Text type="secondary">{fullAddress}</Typography.Text>
        <Typography.Text strong>temperature:</Typography.Text>
        <Space
          direction="horizontal"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Space direction="vertical">
            <Typography.Text type="secondary">min</Typography.Text>
            <Typography.Text strong>
              {min} {current_weather_units?.temperature}
            </Typography.Text>
          </Space>
          <Space direction="vertical">
            <Typography.Text type="secondary">current</Typography.Text>
            <Typography.Text strong>
              {current_weather?.temperature}{" "}
              {current_weather_units?.temperature}
            </Typography.Text>
          </Space>
          <Space direction="vertical">
            <Typography.Text type="secondary">max</Typography.Text>
            <Typography.Text strong>
              {max} {current_weather_units?.temperature}
            </Typography.Text>
          </Space>
        </Space>
      </Space>
      <Weather
        open={open}
        onClose={changeOpenHandler}
        hourly={hourly}
        type={current_weather_units?.temperature}
      />
    </Card>
  );
};

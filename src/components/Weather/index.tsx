import React from "react";
import { Modal, Space, Typography } from "antd";
import { format } from "date-fns";
import { IWeather } from "../../types/weather";

export const Weather: React.FC<IWeather> = ({
  open,
  onClose,
  hourly,
  type,
}) => {
  const temperatures = hourly.temperature_2m.slice(0, 24);
  return (
    <Modal open={open} onCancel={onClose} onOk={onClose}>
      <Space
        direction="horizontal"
        style={{ overflow: "auto", maxWidth: "100%", marginTop: 30 }}
      >
        {temperatures.map((temp, idx) => (
          <Space
            key={Math.random()}
            direction="vertical"
            style={{ width: "max-content", margin: "0 10px 20px" }}
            align="center"
          >
            <Typography.Text type="secondary">
              {format(new Date(hourly.time[idx]), "H:mm")}
            </Typography.Text>
            <Typography.Text strong>
              {temp} {type}
            </Typography.Text>
          </Space>
        ))}
      </Space>
    </Modal>
  );
};

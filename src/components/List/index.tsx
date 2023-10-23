import React from "react";
import { TUserData } from "../../types/user";
import { CardComponent } from "../UI/Card";
import { Spin, Flex, Button, Space } from "antd";

export const List: React.FC<TUserData> = ({
  data,
  loading,
  loadMore,
  onLoad,
  isSaved,
}) => {
  return (
    <>
      <Space wrap style={{ justifyContent: "center" }}>
        {loading && !data.length ? (
          <Flex
            vertical
            justify="center"
            align="center"
            style={{ padding: "50px 0" }}
          >
            <Spin size="large" />
          </Flex>
        ) : (
          data.map((user) => (
            <CardComponent
              isSaved={isSaved}
              {...user}
              key={user.id.name + Math.random()}
            />
          ))
        )}
      </Space>
      {!isSaved && (
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ marginTop: 50 }}
        >
          <Button
            disabled={loadMore}
            type="primary"
            onClick={onLoad}
            style={{ width: 160 }}
          >
            {loadMore ? <Spin size="small" /> : "Load more"}
          </Button>
        </Flex>
      )}
    </>
  );
};

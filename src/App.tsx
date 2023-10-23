import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { Layout, Flex, Button } from "antd";
import { Link } from "react-router-dom";
import "./App.css";
import { routes } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="link">
            <Link to={routes.main}>Main</Link>
          </Button>
          <Button type="link">
            <Link to={routes.saved}>Saved</Link>
          </Button>
        </Layout.Header>
        <Layout.Content
          style={{
            padding: "20px",
            minHeight: `calc(100vh - 64px)`,
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <Flex gap="middle" vertical>
            <Router />
          </Flex>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

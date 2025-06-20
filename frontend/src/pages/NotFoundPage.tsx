import { Button, Typography } from "antd";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      <Title level={1} style={{ margin: 0 }}>
        404
      </Title>
      <Text type="secondary" style={{ fontSize: 18 }}>
        Resource was not found
      </Text>
      <Button type="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;

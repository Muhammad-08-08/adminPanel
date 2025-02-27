import { LoadingOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import useMyStore from "../store/my-store";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-96 shadow-lg shadow-gray-500">
        <Form
          layout="vertical"
          className="flex flex-col gap-3"
          onFinish={(values) => {
            console.log(values);
            setLoading(true);

            axios
              .post("https://library.softly.uz/auth/signin", values)
              .then((response) => {
                console.log(response.data);
                setLoading(false);
                message.success("muvaffaqqiyatli amalga oshirildi");

                useMyStore.setState({
                  token: response.data.token,
                  user: response.data.user,
                });

                localStorage.setItem(
                  "yangi_panel",
                  JSON.stringify(response.data)
                );
              })
              .catch((e) => {
                console.log(e);
                message.error("Xatolik");
                setLoading(false);
              });
          }}
        >
          <Form.Item
            label="username"
            name="username"
            rules={[
              {
                required: true,
                message: "iltimos inputga Login kiriting!",
              },
              {
                min: 3,
                message: "Login kamida 3 ta harf qatnashgan bo'lishi kerak",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: "iltimos inputga parol kiriting!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              {loading && <LoadingOutlined />}
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;

import { Button, Drawer, Form, Input, message, Radio, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../store/my-store";

function DrawerPage({ name, qoshish }) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [kitobxon, setKitobxon] = useState();
  const [loading, setLoading] = useState(false);
  const state = useMyStore();
  return (
    <div>
      <div className="flex justify-between pl-2 pr-6 mb-4">
        <h1 className="text-xl font-bold">{name}</h1>
        <Button
          onClick={() => {
            setIsOpenDrawer(true);
          }}
          type="primary"
        >
          {qoshish}
        </Button>
      </div>
      <div>{loading && <Spin />}</div>
      <Drawer
        open={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            setLoading(true);
            axios
              .post("https://library.softly.uz/api/users", values, {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              })
              .then((response) => {
                setKitobxon(response.data);
                message.success("Kitobxon qo'shildi");
                setIsOpenDrawer(false);
              })
              .catch((error) => {
                console.error("There was an error adding the user!", error);
                message.error("Xatolik");
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form.Item
            label="Ism"
            name="firstName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Familya"
            name="lastName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon Raqam"
            name="phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Jinsi"
            name="gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Qo'shish
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default DrawerPage;

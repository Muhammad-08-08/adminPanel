import { Button, Drawer, Form, message, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useMyStore from "../store/my-store";

function DrawerPage({ name, qoshish, apiName, children }) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
              .post(`https://library.softly.uz/api/${apiName}`, values, {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              })
              .then((response) => {
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
          {children}
        </Form>
      </Drawer>
    </div>
  );
}

export default DrawerPage;

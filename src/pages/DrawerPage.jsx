import { Button, Drawer, Form, message, Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import useMyStore from "../store/my-store";

function DrawerPage({
  name,
  qoshish,
  apiName,
  children,
  onAddOrUpdate,
  editItem,
  isOpen,
  setIsOpen,
}) {
  const [loading, setLoading] = useState(false);
  const state = useMyStore();

  const handleSubmit = (values) => {
    setLoading(true);
    const url = editItem
      ? `https://library.softly.uz/api/${apiName}/${editItem.id}`
      : `https://library.softly.uz/api/${apiName}`;
    const method = editItem ? "put" : "post";

    axios({
      method,
      url,
      data: values,
      headers: { Authorization: `Bearer ${state.token}` },
    })
      .then(() => {
        message.success(editItem ? "Tahrirlandi" : "Qo'shildi");
        setIsOpen(false);
        onAddOrUpdate();
      })
      .catch(() => message.error("Xatolik"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="flex justify-between pl-2 pr-6 mb-4">
        <h1 className="text-xl font-bold">{name}</h1>
        <Button onClick={() => setIsOpen(true)} type="primary">
          {qoshish}
        </Button>
      </div>
      <Spin spinning={loading}>
        <Drawer
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          destroyOnClose
        >
          <Form
            initialValues={editItem}
            layout="vertical"
            onFinish={handleSubmit}
          >
            {children}
          </Form>
        </Drawer>
      </Spin>
    </div>
  );
}

export default DrawerPage;

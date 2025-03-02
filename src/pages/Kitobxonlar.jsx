import { Button, Form, Input, message, Radio, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Kitobxonlar() {
  const [kitobxonlar, setKitobxonlar] = useState();
  const state = useMyStore();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = () => {};

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: { size: pageSize, page: currentPage },
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        setKitobxonlar(response.data), message.success("muvaffaqqiyatli");
      })
      .catch(() => message.error("Xatolik"));
  }, [currentPage]);

  if (!kitobxonlar) {
    return <Spin />;
  }

  return (
    <div>
      <DrawerPage
        name="Kitobxonlar"
        qoshish="Kitobxon qo'shish"
        apiName="users"
        editItem={selectedUser}
        onAddOrUpdate={fetchUsers}
      >
        <Form.Item label="Ism" name="firstName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Familya" name="lastName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefon Raqam"
          name="phone"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Jinsi" name="gender" rules={[{ required: true }]}>
          <Radio.Group
            options={[
              { label: "Erkak", value: "male" },
              { label: "Ayol", value: "female" },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Saqlash
        </Button>
      </DrawerPage>

      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, record) => (
              <div
                onClick={() => setSelectedUser(record)}
                className="text-blue-600 cursor-pointer"
              >
                {id}
              </div>
            ),
          },
          { title: "Ism", dataIndex: "firstName" },
          { title: "Familya", dataIndex: "lastName" },
          { title: "Telefon", dataIndex: "phone" },
          {
            title: "Status",
            dataIndex: "status",
            render: (value) =>
              value === 1 ? (
                <Button color="cyan" variant="filled">
                  active
                </Button>
              ) : (
                <Button color="danger" variant="filled">
                  block
                </Button>
              ),
          },
          { title: "Hisob", dataIndex: "balance" },
          {
            title: "Yasalgan",
            dataIndex: "createdAt",
            render: (value) =>
              new Date(value).toLocaleString("ru", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
          },
          {
            title: "Yangilangan",
            dataIndex: "updatedAt",
            render: (value) =>
              new Date(value).toLocaleString("ru", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
          },
        ]}
        dataSource={kitobxonlar.items}
        rowKey="id"
        pagination={{
          pageSize,
          current: currentPage,
          total: kitobxonlar.totalCount,
        }}
        onChange={(pagination) => setCurrentPage(pagination.current)}
      />
    </div>
  );
}

export default Kitobxonlar;

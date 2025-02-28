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
  const [selectedUser, setSelectedUser] = useState(null); // Edit uchun

  const fetchUsers = () => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: { size: pageSize, page: currentPage },
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => setKitobxonlar(response.data))
      .catch(() => message.error("Xatolik"));
  };

  useEffect(fetchUsers, [currentPage]);

  if (!kitobxonlar) {
    return <Spin />;
  }

  return (
    <div>
      <DrawerPage
        name="Kitobxonlar"
        qoshish="Kitobxon qo'shish"
        apiName="users"
        editItem={selectedUser} // Edit item
        onAddOrUpdate={fetchUsers} // Qo‘shilganda yoki tahrirlanganda refresh
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
                onClick={() => setSelectedUser(record)} // Edit rejimga o‘tish
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
                <Button color="cyan">active</Button>
              ) : (
                <Button danger>block</Button>
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

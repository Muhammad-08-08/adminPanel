import { Button, DatePicker, Form, message, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Ijaralar() {
  const [ijaralar, setIjaralar] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const state = useMyStore();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRents = () => {
    axios
      .get("https://library.softly.uz/api/rents", {
        params: { size: pageSize, page: currentPage },
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        setIjaralar(response.data.items);
      })
      .catch(() => message.error("Ijaralarni yuklashda xatolik"));
  };

  const fetchStocks = () => {
    axios
      .get("https://library.softly.uz/api/stocks", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        setStocks(response.data.items);
      })
      .catch(() => message.error("Zaxira kitoblarni yuklashda xatolik"));
  };

  const fetchUsers = () => {
    axios
      .get("https://library.softly.uz/api/users", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        setUsers(response.data.items);
      })
      .catch(() => message.error("Foydalanuvchilarni yuklashda xatolik"));
  };

  useEffect(() => {
    fetchRents();
    fetchStocks();
    fetchUsers();
  }, [currentPage]);

  return (
    <div>
      <DrawerPage
        name="Ijaralar"
        qoshish="Ijarachi qo'shish"
        apiName="rents"
        editItem={selectedUser}
        fetchUsers={fetchRents}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Form.Item
          label="Kitobxon"
          name="userId"
          rules={[{ required: true, message: "Kitobxonni tanlang!" }]}
        >
          <Select
            showSearch
            placeholder="Kitobxonni tanlang"
            options={users.map((user) => ({
              value: user.id,
              label: `${user.firstName} ${user.lastName}`,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Zaxira kitobi"
          name="stockId"
          rules={[{ required: true, message: "Zaxira kitobini tanlang!" }]}
        >
          <Select
            showSearch
            placeholder="Zaxira kitobini tanlang"
            options={stocks.map((stock) => ({
              value: stock.id,
              label: stock.book.name,
            }))}
          />
        </Form.Item>

        <Form.Item label="Topshirilgan sana" name="leasedAt">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Qaytarilishi kerak bo'lgan sana" name="returningDate">
          <DatePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </DrawerPage>

      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, record) => (
              <p
                onClick={() => {
                  setSelectedUser(record);
                  setIsOpen(true);
                }}
              >
                {id}
              </p>
            ),
          },
          {
            title: "Kitobxon",
            dataIndex: "user",
            render: (user) => `${user.firstName} ${user.lastName}`,
          },
          {
            title: "Zaxira kitobi",
            dataIndex: "stock",
            render: (stock) => stock?.book?.name,
          },
          {
            title: "Topshirilgan sana",
            dataIndex: "leasedAt",
            render: (date) =>
              date ? new Date(date).toLocaleDateString() : "Noma'lum",
          },
          {
            title: "Qaytarilishi kerak",
            dataIndex: "returningDate",
            render: (date) =>
              date ? new Date(date).toLocaleDateString() : "Noma'lum",
          },
        ]}
        dataSource={ijaralar}
        rowKey="id"
        pagination={{
          pageSize,
          current: currentPage,
          total: ijaralar.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
}

export default Ijaralar;

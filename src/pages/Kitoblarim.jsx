import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, Form, message, Select, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Kitoblarim() {
  const [kitoblarim, setKitoblarim] = useState();
  const [books, setBooks] = useState([]);
  const state = useMyStore();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://library.softly.uz/api/stocks", {
        params: { size: pageSize, page: currentPage },
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        setKitoblarim(response.data);
      })
      .catch(() => message.error("Xatolik"))
      .finally(() => setLoading(false));

    axios
      .get("https://library.softly.uz/api/books", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((response) => {
        setBooks(response.data.items);
        console.log(response.data.items);
      })
      .catch(() => message.error("Kitoblarni yuklashda xatolik"));
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  if (!kitoblarim || loading) return <Spin />;

  return (
    <div>
      <DrawerPage
        name="Kitoblarim"
        qoshish="Kitob qo'shish"
        apiName="stocks"
        editItem={selectedUser}
        fetchUsers={fetchUsers}
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
      >
        <Form.Item
          label="Kitob"
          name="bookId"
          rules={[{ required: true, message: "Iltimos, kitobni tanlang" }]}
        >
          <Select
            options={books.map((b) => ({ value: b.id, label: b.name }))}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {selectedUser ? "Tahrirlash" : "Qo'shish"}
        </Button>
      </DrawerPage>

      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, record) => (
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setSelectedUser(record);
                  setIsDrawerOpen(true);
                }}
              >
                {id}
              </span>
            ),
          },
          {
            title: "Kitob",
            dataIndex: "book",
            render: (book, record) => (
              <p
                onClick={() => {
                  setSelectedUser(record);
                  setIsDrawerOpen(true);
                }}
              >
                {book?.name}
              </p>
            ),
          },
          {
            title: "Bandlik",
            dataIndex: "busy",
            render: (busy) =>
              busy ? (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              ) : (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ),
          },
          {
            title: "Yasalgan",
            dataIndex: "createdAt",
            render: (value) =>
              new Date(value).toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }),
          },
        ]}
        dataSource={kitoblarim.items}
        rowKey="id"
        pagination={{
          pageSize,
          current: currentPage,
          total: kitoblarim.totalCount,
        }}
        onChange={(pagination) => setCurrentPage(pagination.current)}
      />
    </div>
  );
}

export default Kitoblarim;

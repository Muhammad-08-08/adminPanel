import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Spin, Table } from "antd";
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
  const [selectUser, setSelectedUser] = useState();

  const fetchUsers = () => {};

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/stocks", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((response) => {
        setKitoblarim(response.data);
      })
      .catch((e) => {
        console.log(e);
        message.error("Xatolik");
      });
  }, [currentPage]);

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/books", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((response) => {
        setBooks(response.data.items);
        message.success("muvaffaqqiyatli")
      })
      .catch(() => {
        message.error("Kitoblarni yuklashda xatolik");
      });
  }, []);

  const handleAfterAdd = (newItem) => {
    if (!books.find((b) => b.id === newItem.book.id)) {
      setBooks((prevBooks) => [...prevBooks, newItem.book]);
    }
  };

  if (!kitoblarim) {
    return <Spin />;
  }

  return (
    <div>
      <DrawerPage
        name="kitoblarim"
        qoshish={"Kitob qo'shish"}
        apiName={"stocks"}
        onAdd={handleAfterAdd}
        editItem={selectUser}
        onAddOrUpdate={fetchUsers}
      >
        <div className="flex gap-2 w-full overflow-x-hidden">
          <Form.Item
            label="Kitob"
            name="bookId"
            rules={[
              {
                required: true,
              },
            ]}
            className="w-[250px]"
          >
            <Select
              options={books.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Kitob"
            name="bookId"
            rules={[
              {
                required: true,
              },
            ]}
            className="w-24"
          >
            <Select
              options={books.map((item) => ({
                value: item.id,
                label: item.id,
              }))}
            />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit">
          Qo'shish
        </Button>
      </DrawerPage>

      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, render) => {
              return (
                <div
                  onClick={() => {
                    setSelectedUser(render);
                  }}
                  className="text-blue-600 cursor-pointer"
                >
                  {id}
                </div>
              );
            },
          },
          {
            title: "Kitob",
            dataIndex: "book",
            render: (value) => <p>{value.name}</p>,
          },
          {
            title: "Bandlik",
            dataIndex: "busy",
            render: (value) =>
              value ? (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              ) : (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ),
          },
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
        ]}
        dataSource={kitoblarim.items}
        rowKey="id"
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: kitoblarim.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default Kitoblarim;

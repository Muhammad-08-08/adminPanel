import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Form, Input, message, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Kitoblarim() {
  const [kitoblarim, setkitoblarim] = useState();
  const state = useMyStore();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

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
        setkitoblarim(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        message.error("Xatolik");
      });
  }, [currentPage]);

  if (!kitoblarim) {
    return <Spin />;
  }
  return (
    <div>
      <DrawerPage
        name="kitoblarim "
        qoshish={"Kitobxon qo'shish"}
        apiName={"stocks"}
      >
        <Form.Item
          label="Kitob"
          name=""
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </DrawerPage>
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "kitob",
            dataIndex: "book",
            render: (value) => {
              return <p>{value?.name}</p>;
            },
          },
          {
            title: "Bandlik",
            dataIndex: "busy",
            render: (value) => {
              return value ? (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              ) : (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              );
            },
          },
          {
            title: "Yasalgan",
            dataIndex: "createdAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
            },
          },
          {
            title: "Bandlik",
            dataIndex: "busy",
            render: (value) => {
              return value ? (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              ) : (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              );
            },
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
          console.log(pagination);
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default Kitoblarim;

import { Form, Input, message, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../api/Api";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Ijaralar() {
  const [ijaralar, setIjaralar] = useState();

  useEffect(() => {
    api
      .get("/api/rents", {
        params: {
          size: 20,
          page: 1,
        },
      })
      .then((response) => {
        setIjaralar(response.data.items);
        message.success("muvaffaqqiyatli");
      })
      .catch((e) => {
        console.log(e);
        message.error("Xatolik");
      });
  }, []);

  if (!ijaralar) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DrawerPage name={"Ijaralar"} qoshish={"ijarachi qo'shish"}>
        <Form.Item
          label="Kitobxon"
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
            title: "KvID",
            dataIndex: "customId",
          },
          {
            title: "Berildi",
            dataIndex: "leasedAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              });
            },
          },
          {
            title: "Qaytadi",
            dataIndex: "returningDate",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              });
            },
          },
          {
            title: "Qoldi / Jami",
            dataIndex: "createdAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              });
            },
          },
          {
            title: "Qaytgan",
            dataIndex: "returnedAt",
            render: (checkbox) => {
              return (
                <Switch checked={checkbox ? true : false} onChange={checkbox} />
              );
            },
          },
          {
            title: "Kitobxon",
            dataIndex: "user",
            render: (user) => {
              return (
                <div className="flex gap-1">
                  <p className="font-bold">{user.id}.</p>
                  <p className="text-blue-600">{user.firstName}</p>
                  <p className="text-blue-600">{user.lastName}</p>
                </div>
              );
            },
          },
          {
            title: "Zahira kitobi",
            dataIndex: "id",
          },
          {
            title: "Yangilangan",
            dataIndex: "id",
          },
        ]}
        dataSource={ijaralar}
        rowKey="id"
      />
    </div>
  );
}

export default Ijaralar;

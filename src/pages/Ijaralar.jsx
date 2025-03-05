import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Switch,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Ijaralar() {
  const [ijaralar, setIjaralar] = useState();
  const state = useMyStore();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/stocks", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        setStocks(res.data.items);
        console.log(res.data.items);

        axios
          .get("https://library.softly.uz/api/rents", {
            params: { size: 20, page: 1 },
            headers: { authorization: "Bearer " + state.token },
          })
          .then((response) => {
            const rentsWithStocks = response.data.items.map((rent) => {
              const stock = res.data.items.find((s) => s.id === rent.stockId);
              return { ...rent, stock };
            });

            setIjaralar(rentsWithStocks);
            message.success("muvaffaqqiyatli");
          })
          .catch((e) => {
            console.log(e);
            message.error("Xatolik");
          });
      })
      .catch(() => {
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
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={[
            {
              
            }
          ]} />
        </Form.Item>
        <Form.Item>
          <Select />
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
            dataIndex: "stock",
            render: (stock) => stock?.book?.name || "nomalum",
          },
          {
            title: "Yangilangan",
            dataIndex: "createdAt",
            render: () => {
              return new Date().toLocaleString("ru", {
                month: "2-digit",
                year: "numeric",
                day: "2-digit",
              });
            },
          },
        ]}
        dataSource={ijaralar}
        rowKey="id"
      />
    </div>
  );
}

export default Ijaralar;

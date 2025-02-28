import { Button, message, Spin, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useMyStore from "../store/my-store";
import DrawerPage from "./DrawerPage";

function Kitobxonlar() {
  const [kitobxonlar, setKitobxonlar] = useState();
  const state = useMyStore();
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/users", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((response) => {
        setKitobxonlar(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        message.error("Xatolik");
      });
  }, [currentPage]);

  if (!kitobxonlar) {
    return <Spin />;
  }
  return (
    <div>
      <DrawerPage name="Kitobxonlar" qoshish={"Kitobxon qo'shish"} />
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Ism",
            dataIndex: "firstName",
          },
          {
            title: "Familya",
            dataIndex: "lastName",
          },
          {
            title: "Telefon",
            dataIndex: "phone",
          },
          {
            title: "Status",
            dataIndex: "status",
            render: (values) => {
              return values === 1 ? (
                <Button color="cyan" variant="filled">
                  active
                </Button>
              ) : (
                <Button color="danger" variant="outlined">
                  block
                </Button>
              );
            },
          },
          {
            title: "Hisob",
            dataIndex: "balance",
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
            title: "Yangilangan",
            dataIndex: "updatedAt",
            render: () => {
              return new Date().toLocaleString("ru", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              });
            },
          },
        ]}
        dataSource={kitobxonlar.items}
        rowKey="id"
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: kitobxonlar.totalCount,
        }}
        onChange={(pagination) => {
          console.log(pagination);
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default Kitobxonlar;

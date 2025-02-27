import { message, Spin, Table } from "antd";
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
      <DrawerPage />
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

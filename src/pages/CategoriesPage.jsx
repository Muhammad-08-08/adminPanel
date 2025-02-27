import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function CategoriesPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://679c700087618946e6522f88.mockapi.io/todos/Categories")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  if (!products) {
    return <div className="text-center font-bold text-xl">Loading...</div>;
  }

  return (
    <div className="w-[90%] mx-auto">
      <Table
        bordered
        columns={[
          {
            title: "id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "age",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "image",
            dataIndex: "image",
            key: "image",
            render: (image) => {
              return <img className="w-16" src={image} alt="img" />;
            },
          },
        ]}
        dataSource={products}
      />
    </div>
  );
}

export default CategoriesPage;

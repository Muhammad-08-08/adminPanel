import {
  BookOutlined,
  FolderAddOutlined,
  HomeOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router";

function SideMenu({ collapsed }) {
  const location = useLocation();
  const navigation = useNavigate();
  return (
    <div className="select-none">
      <Menu
        style={{
          height: "89vh",
          padding: 10,
          maxWidth: 250,
        }}
        selectedKeys={location.pathname}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={[
          {
            key: "/",
            label: "Home",
            icon: <HomeOutlined />,
            onClick: () => {
              navigation("/");
            },
          },
          {
            key: "/mahsulotlar",
            label: <Link to={"/mahsulotlar"}>mahsulotlar</Link>,
            icon: <ProductOutlined />,
          },
          {
            key: "/categories",
            label: <Link to={"/categories"}>Categories</Link>,
            icon: <FolderAddOutlined />,
          },
          {
            key: "/ijaralar",
            label: <Link to={"/ijaralar"}>Ijaralar</Link>,
            icon: <FolderAddOutlined />,
          },
          {
            key: "/kitobxonlar",
            label: <Link to={"/kitobxonlar"}>Kitobxonlar</Link>,
            icon: <BookOutlined />,
          },
        ]}
      />
    </div>
  );
}

export default SideMenu;

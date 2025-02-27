import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import { Link } from "react-router";
import useMyStore from "../store/my-store";

function Navbar({ collapsed, setCollapsed }) {
  const state = useMyStore();
  return (
    <div className="w-full h-20 bg-slate-900 text-white flex justify-between items-center px-10">
      <div className="flex gap-2 items-center">
        <Button
          type="primary"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Link to={"/"}>
          <h1 className="text-3xl font-mono select-none cursor-pointer">
            Logo
          </h1>
        </Link>
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "Sozlamalar",
              icon: <SettingOutlined />,
            },
            {
              key: 2,
              label: "profilim",
              icon: <UserOutlined />,
            },
            {
              key: 3,
              label: "chiqish",
              danger: true,
              icon: <LogoutOutlined />,
              onClick: () => {
                useMyStore.setState({
                  token: "",
                  user: null,
                });
                localStorage.removeItem("yangi_panel");
              },
            },
          ],
        }}
        placement="bottomLeft"
      >
        <div className="flex gap-2 items-center">
          <div>
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <div>
            <p>
              {state.user.firstName} {state.user.lastName}
            </p>
            <p>@{state.user.username}</p>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default Navbar;

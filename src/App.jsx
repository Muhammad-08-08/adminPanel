import { useState } from "react";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";
import LoginPage from "./pages/LoginPage";
import useMyStore from "./store/my-store";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const isLogin = useMyStore();
  return (
    <div>
      {isLogin.user ? (
        <div>
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="flex">
            <SideMenu collapsed={collapsed} />
            <Main />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;

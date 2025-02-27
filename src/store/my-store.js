import { create } from "zustand";

const useMyStore = create(() => {
  const ls_string = localStorage.getItem("yangi_panel");
  if (!ls_string) {
    return {
      token: "",
      user: null,
    };
  }

  const ls = JSON.parse(ls_string);
  return {
    token: ls.token,
    user: ls.user,
  };
});
export default useMyStore;

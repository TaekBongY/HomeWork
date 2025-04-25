import { useContext } from "react";
import { UsersContext } from "../context/UserContext.jsx";

const useUsers = () => {
  return useContext(UsersContext);
};

export default useUsers;

import React, { useContext } from "react";
import { userContext } from "../App";
import AdminSettings from "../component/AdminSettings";
import StudentSettings from "../component/StudentSettings";
export default function Settings() {
  const {
    user: { isAdmin },
  } = useContext(userContext);
  if (isAdmin) {
    return <AdminSettings />;
  } else {
    return <StudentSettings />;
  }
  // return <h1>Under Construction ... </h1>;
}

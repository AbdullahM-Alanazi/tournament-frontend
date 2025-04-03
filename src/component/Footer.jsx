import React from "react";
import Copyright from "./CopyRight";

export default function Footer() {
  return (
    <Copyright
      sx={{
        mt: 8,
        mb: 4,
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    />
  );
}

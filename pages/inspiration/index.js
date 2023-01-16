import React from "react";

import DrawerLeft from "../../components/Inspiration/leftDrawer";

import SnackBar from "../../components/Common/snackBar";

function Index() {
  return (
    <div style={{ position: "relative" }}>
      <DrawerLeft />
      <SnackBar />
    </div>
  );
}

export default Index;

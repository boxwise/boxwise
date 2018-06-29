import React from "react";
import AppFrame from "../../../components/AppFrame";
import CodeReaderCard from "../containers/CodeReaderCard";

export const CodeReader = () => (
  <AppFrame title="Read QR Code">
    <CodeReaderCard />
  </AppFrame>
);

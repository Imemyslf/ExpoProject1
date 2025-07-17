import React from "react";
import MainInvoiceScreen from "./Tabs/MainInvoiceTab";
import Header from "../Components/Header"; 

export default function Index() {

  return (
    <>
      <Header title="Forage" />
      <MainInvoiceScreen />
    </>
  );
}

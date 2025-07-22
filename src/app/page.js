import Home from "@/mycomponents/HomePage";
import React from "react";

export const metadata = {
  title: "Utsab's Portfolio",
  description: "Welcome to the portfolio of Utsab Adhikari",
  icons: {
    icon: "./public/icon.png",
  },
};

const page = () => {
  return <Home />;
};

export default page;

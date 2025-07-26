"use client";

import AlbumPage from "@/components/General/AlbumPage";
import { useSession } from "next-auth/react";
import React from "react";
import RequestPage from "./RequestPage";
import RequestsPage from "./Requests";

export const metadata = {
  title: "Authenticated",
  description: "Page for unauthenticated access",
};

const Family = () => {
  const { data: session } = useSession();

  if (session.user.family === "member") {
    return <RequestPage />;
  }

  if (session.user.family === "family") {
    return (
      <div className="p-6 ">
        <AlbumPage />

        {session.user.role === "admin" && <>
          <RequestsPage/>
        </>}
      </div>
    );
  }
};

export default Family;

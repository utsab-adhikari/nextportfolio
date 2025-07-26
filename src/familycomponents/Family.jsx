"use client";

import AlbumPage from "@/components/General/AlbumPage";
import React from "react";

export const metadata = {
  title: "Authenticated",
  description: "Page for unauthenticated access",
};

const Family = () => {

  return (
    <div className="p-6 ">
      <AlbumPage />

      {/* Modal */}
    </div>
  );
};

export default Family;

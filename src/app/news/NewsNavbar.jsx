import Link from "next/link";
import React from "react";

const NewsNavbar = ({ pathname }) => {
  const linkStyle = (href) =>
    pathname === href
      ? "border-2 border-indigo-600 rounded-xl text-indigo-600 px-3 py-2"
      : "px-3 text-white py-2";

  return (
    <div className="z-100 font-semibold flex flex-wrap justify-evenly items-center  rounded-xl m-2">
      <Link className={linkStyle("/news")} href="/news">
        Latest
      </Link>
      <Link className={linkStyle("/news/saved")} href="/news/saved">
        Saved
      </Link>
      <Link className={linkStyle("/news/nagariknews")} href="/news/nagariknews">
        Nagarik
      </Link>
      <Link className={linkStyle("/news/thektmpost")} href="/news/thektmpost">
      KTMPost
      </Link>
      <Link className={linkStyle("/news/annapurnapost")} href="/news/annapurnapost">
        Annapurna
      </Link>
    </div>
  );
};

export default NewsNavbar;

import Link from "next/link";
import React from "react";

// font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouseMedical } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header id="headerArea" className="px-6 py-3 bg-green-400 box-border">
      <nav>
        <ul className="flex justify-between">
          <li className="w-full">
            <Link href="/">{/* <FontAwesomeIcon icon={faHouseMedical} style={{ color: "#fff", fontSize: "28px" }} /> */}</Link>
          </li>
          {/* <li className="w-auto">
            <Link href="/location">Location</Link>
          </li>
          <li className="w-auto">
            <Link href="/info">Info</Link>
          </li>
          <li className="w-auto">
            <Link href="/notice">Notice</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

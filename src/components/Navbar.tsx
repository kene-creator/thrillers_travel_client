import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styles } from "../styles";
import search from "../assets/icons/search-normal.png";
import filter from "../assets/icons/filter.png";

export default function Navbar() {
  return (
    <nav
      className={`${styles.paddingX} w-full flex flex-col lg:flex-row items-center py-5 justify-center lg:justify-between bg-white`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-12">
        <div>
          <a
            href="/"
            className="main_font font-bold text-[2rem] text-[#3563E9]"
          >
            Thrillers Travel
          </a>
        </div>
        <div className="relative w-full flex lg:block">
          <input
            type="text"
            placeholder="Search something here"
            className="border border-black-300 py-2 pl-12 pr-12 rounded-md lg:rounded-[2rem] focus:outline-none lg:w-[30rem] w-full"
          />
          <button className="absolute left-[1rem] top-[0.5rem]">
            <img src={search} alt="search icon" />
          </button>
          <button className="lg:absolute lg:right-[1rem] lg:top-[0.5rem] lg:border-0 lg:p-0 lg:ml-0 border border-black-300 p-1 ml-2">
            <img src={filter} alt="search icon" />
          </button>
        </div>
      </div>
      <div className="flex justify-center align-center gap-8 mt-4 lg:mt-0">
        <div className="flex gap-4 justify-center align-center">
          <div className="p-2 border border-black-300 rounded-full">
            <FavoriteIcon
              sx={{
                color: "#596780",
              }}
            />
          </div>
          <div className="p-2 border border-black-300 rounded-full">
            <NotificationsIcon
              sx={{
                color: "#596780",
              }}
            />
          </div>
          <div className="p-2 border border-black-300 rounded-full">
            <SettingsIcon
              sx={{
                color: "#596780",
              }}
            />
          </div>
        </div>
        <div>
          <AccountCircleIcon
            sx={{
              color: "#596780",
              width: "3rem",
              height: "3rem",
            }}
          />
        </div>
      </div>
    </nav>
  );
}

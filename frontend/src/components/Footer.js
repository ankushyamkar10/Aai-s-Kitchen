import React from "react";
import { Link } from "react-router-dom";
import { MdFacebook, MdLocalPhone, MdMail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="bg-yellow-500 mt-4 ">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="flex flex-col my-2">
          <h1 className="text-md font-bold tracking-wider underline mb-1">
            Address
          </h1>
          <div className="text-sm">706 / Om Sai</div>
          <div className="text-sm">Gundavli Gauthan</div>
          <div className="text-sm">Andheri E</div>
          <div className="text-sm">Mumbai-69</div>
        </div>
        <div className="flex flex-col my-2">
          <h1 className="text-md font-bold tracking-wider underline mb-1">
            Contact
          </h1>
          <Link to="tel:9321892495">
            <div className="flex items-center text-sm">
              <MdLocalPhone className="mr-2" />
              9321892495
            </div>
          </Link>
          <Link to="mailto:yamkar.ab10@gmail.com">
            <div className="flex items-center text-sm">
              <MdMail className="mr-2" />
              yamkar@gmail.com
            </div>
          </Link>
          <Link to="https://facebook.com">
            <div className="flex items-center text-sm">
              <MdFacebook className="mr-2" />
              Aai's Kitchen
            </div>
          </Link>
          <Link to="https://www.instagram.com/mr.ankush_yamkar/">
            <div className="flex items-center text-sm">
              <GrInstagram className="mr-2" />
              aai's_kitchen
            </div>
          </Link>
        </div>
      </div>
      <div className="block text-center mt-1 ">
        Aai's Kitchen &#169; 2023 - Ankush Yamkar
      </div>
    </div>
  );
};

export default Footer;

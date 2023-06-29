import React from "react";
import { Link } from "react-router-dom";
import { MdFacebook, MdLocalPhone, MdMail } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="bg-yellow-500">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="flex flex-col my-2">
          <h1 className="text-md font-bold tracking-wider underline mb-1">Address</h1>
          <div>706 / Om Sai</div>
          <div>Gundavli Gauthan</div>
          <div>Andheri E</div>
          <div>Mumbai-69</div>
        </div>
        <div className="flex flex-col my-2">
          <h1 className="text-md font-bold tracking-wider underline mb-1">Contact</h1>
          <Link to="tel:9321892495"><div className="flex items-center"><MdLocalPhone className="mr-2" />9321892495</div></Link>
          <Link to="mailto:yamkar.ab10@gmail.com"><div className="flex items-center"><MdMail className="mr-2" />yamkar@gmail</div></Link>
          <Link to="https://facebook.com"><div className="flex items-center"><MdFacebook className="mr-2" />Aai's Kitchen</div></Link>
          <Link to="https://www.instagram.com/mr.ankush_yamkar/"><div className="flex items-center"><GrInstagram className="mr-2" />aai's_kitchen</div></Link>
        </div>
      </div>
    <div className="block text-center mt-2 ">Aai's Kitchen &#169; 2023 - Ankush Yamkar</div>
    </div>
  );
};

export default Footer;

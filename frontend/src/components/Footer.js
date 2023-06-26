import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col ">
        <h1 className="text-md font-bold tracking-wider underline">Address</h1>
        <address>
          Written by <a href="http://localhost:3000" className="underline">Yamkar</a>.<br />
          Andheri , Mum-69
          <br />
          INDIA
        </address>
      </div>

    </div>
  );
};

export default Footer;

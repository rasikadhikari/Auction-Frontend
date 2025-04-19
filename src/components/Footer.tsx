import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-4 w-full mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Auction Houses. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

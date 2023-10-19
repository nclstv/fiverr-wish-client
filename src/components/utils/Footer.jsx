import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} All copyright belongs to Nicolas
          Stevens and Enzo Mazzei.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

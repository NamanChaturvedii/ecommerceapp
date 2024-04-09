import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import pic from "./images/contact.jpeg"


const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={pic}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about website and for giving me work ... free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : namanchaturvedi58@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 8769612896
          </p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
import React from "react";
import Layout from "./../components/Layout/Layout";
import pic from "./images/contactus.jpeg"


const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={pic}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>This is a project based website and it will be modified simultaneously..</p>
          <h3>All Rights Are Reserved.</h3>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
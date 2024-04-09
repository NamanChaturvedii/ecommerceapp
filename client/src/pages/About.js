import React from "react";
import Layout from "./../components/Layout/Layout";
import pic from "./images/about.jpeg"

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={pic}
            alt="aboutus"
            style={{ width: "100%" }} 
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Hi everyone .. welcome to my E-commerce website ..
            I Naman Chaturvedi, student of B-tech 1 year . Learning to become a software Engineer from VIT-BHOPAL..
            I am also available for working as FREELANCER..
          </p>
          
        </div>
      </div>
    </Layout>
  );
};

export default About;
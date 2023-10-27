import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h4>
            How e-commerce employees are paying it forward during this year’s
            Global Month of Volunteering
          </h4>
          <p>
            e-commerce India employees are gearing up for Global Month of
            Volunteering, an annual initiative that celebrates giving back and
            getting further involved in the communities where they live and
            work. GMV 2023 is being hosted from 1st September - 30th November to
            provide opportunities for over one lakh employees at Amazon India to
            volunteer alongside their peers, adding to the company’s efforts to
            support its local communities throughout the year.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

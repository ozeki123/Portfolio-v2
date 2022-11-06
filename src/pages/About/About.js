import React from "react";
import "./About.scss";

const About = () => {
  return (
    <>
      <section className="banner">
        <div className="banner-text">
          <div className="text-top">
            <h2>Andrew Ozeki</h2>
          </div>
          <div className="text-center">
            <h2>Front End</h2>
            <h2>&thinsp;Dev</h2>
          </div>
          <div className="text-bottom">
            <div className="text-wrapper">
              <h2>Folio '22</h2>
            </div>
            <div className="banner-about">
              <div className="text-row">
                <p>CREATIVE FRONT END</p>
              </div>
              <div className="text-row">
                <p>DEVELOPER BASED IN TOKYO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
    
  )
}

export default About;
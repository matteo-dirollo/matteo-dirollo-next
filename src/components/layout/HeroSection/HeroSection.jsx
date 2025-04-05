"use client";
import React from "react";

const HeroSection = () => {
  return (
    <section
      className="flex items-center justify-center w-full min-h-[20vh] md:min-h-[40vh] lg:min-h-[60vh] xl:min-h-[80vh] overflow-hidden m-0"
    >
      {/* Left side with text overlay */}
      <div className="container w-full mx-auto flex items-center justify-center">
        <div
          className="left w-[90%] flex items-center justify-center m-0 mr-[-150px] z-10"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl text-black font-light">
            I&apos;m a Graphic, Motion Designer & content creator. <br />
            Available for freelance & collaborations.
          </p>
        </div>

        <div
          className="right min-w-[50%] bg-[url('https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover h-[250px] md:h-[350px] lg:h-[500px] z-0"
        >
          {/* Right side with image */}
          {/* <img
            src="https://firebasestorage.googleapis.com/v0/b/matteo-dirollo-com.appspot.com/o/Home%2Fkombucha_POMEGRANATE_v8.png?alt=media&token=bc44bf97-0fbf-44e3-bda7-9c42f39fb608"
            alt="Your Alt Text"
            className="object-cover w-full h-[600px] z-0"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

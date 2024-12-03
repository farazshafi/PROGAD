import React from "react";
import Header from "../../components/Header/Header"

const AboutUs = () => {
  return (
    <>
    <Header />
      <div className="min-h-screen bg-[#262626] text-white flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-10">
          <h1 className="text-3xl text-black font-poppins sm:text-4xl font-bold text-center mb-6">
            About Us
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-slate-900 text-center mb-6">
            Welcome to <b className="font-poppins">PROGAD</b>, your go-to
            destination for cutting-edge headphones. Founded by{" "}
            <strong className="font-poppins">Faraz Shafi</strong>, an
            18-year-old entrepreneur with a passion for innovation, ProGAD
            started as a humble idea in a small home office and has grown into a
            massive success.
            <br />
            From day one, our mission has been to deliver the best audio
            experience to our customers. Thanks to our dedication, quality
            products, and the support of our amazing customers, Progad has
            transformed into a brand that people trust and love.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <img
              src="https://faraz-project-bucket.s3.eu-north-1.amazonaws.com/our+office.jpg"
              alt="Our Office"
              className="w-full sm:w-1/2 rounded-lg shadow-md"
            />
            <img
              src="https://faraz-project-bucket.s3.eu-north-1.amazonaws.com/headphone+product.jpg"
              alt="Our Product"
              className="w-full sm:w-1/2 rounded-lg shadow-md"
            />
          </div>
          <p className="mt-6 text-gray-800 font-poppins text-center">
            Thank you for being a part of our journey. We're just getting
            started!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

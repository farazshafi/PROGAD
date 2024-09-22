import React from "react";

const SectionHeader = ({text,description}) => {
  return (
    <React.Fragment>
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          backgroundColor: "#FF7F11",
          fontFamily:"Istok Web",
          marginBottom:"70px",
        //   fontWeight:"700",
          color: "#fff",
        }}
      >
        <h1>{text}</h1>
        <p style={{color:"black", fontFamily:"Istok Web"}}>{description}</p>
      </div>
    </React.Fragment>
  );
};

export default SectionHeader;

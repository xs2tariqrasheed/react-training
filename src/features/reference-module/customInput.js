import React from "react";
import "./style.css";

const CustomInput = ({ count, onChange, selected }) => {
  const data = Array.from(Array(count).keys());

  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {data.map((item) => (
          <div onClick={() => handleInputChange(item)}>
            <div class={selected === item ? "circle-optional circle" : "circle"}>
              <div>
                <h3 style={{ cursor: "pointer" }}>{item}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default CustomInput;

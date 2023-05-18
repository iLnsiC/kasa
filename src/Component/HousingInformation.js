import React from "react";
import "./HousingInformation.css";
import Accordion from "./Accordion";

export default function HousingInformation(props) {
  return (
    <div className="housing-accordion">
      <Accordion name={"Description"} rounded={5}>
        {props.description}
      </Accordion>
      <Accordion
        name={"Équipements"}
        list={props.equipments}
        rounded={5}
      ></Accordion>
    </div>
  );
}

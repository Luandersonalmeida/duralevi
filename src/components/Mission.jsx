import React from "react";
import { FaBullseye } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaGem } from "react-icons/fa";

export const Mission = (props) => {
  return (
    <div id="mission" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>{props.data ? props.data.title : "Loading..."}</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="mission-item">
              <div className="mission-icon mission-icon-target">
                <FaBullseye />
              </div>
              <h3>{props.data ? props.data.mission.title : "Loading..."}</h3>
              <p>{props.data ? props.data.mission.text : "Loading..."}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mission-item">
              <div className="mission-icon mission-icon-vision">
                <FaEye />
              </div>
              <h3>{props.data ? props.data.vision.title : "Loading..."}</h3>
              <p>{props.data ? props.data.vision.text : "Loading..."}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mission-item">
              <div className="mission-icon mission-icon-values">
                <FaGem />
              </div>
              <h3>{props.data ? props.data.values.title : "Loading..."}</h3>
              <ul className="values-list">
                {props.data
                  ? props.data.values.list.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))
                  : "Loading..."}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
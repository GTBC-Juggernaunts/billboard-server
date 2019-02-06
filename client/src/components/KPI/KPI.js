import React from 'react';
import './kpi.css';

const KPI = props => {
  return(
    <div className="col s6 m4 KPI-container">
      <div className={"card " + props.cardBackgroundColor}>
        <div className={"card-content " + props.cardTextColor}>
          <div className="card-text">
            <span className="card-title">{props.title}</span>
          </div>
          <span className={
            props.isText ? "KPI-text "+ props.kpiColor : "KPI-num " + props.kpiColor
          }>
          {props.kpi}
        </span>
        </div>
      </div>
    </div>
  )

};

export default KPI

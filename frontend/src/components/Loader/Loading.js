import React from "react";
import loading from '../../assets/images/Eclipse-1s-200px.svg';

const Loading = () => (
  <div className="spinner" style={{marginLeft: '35%'}}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
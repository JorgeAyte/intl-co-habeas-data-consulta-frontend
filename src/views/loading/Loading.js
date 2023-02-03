import React from "react";
import LoadingImg from "../../assets/images/loader-a.svg";
import "./Loading.scss";

const Loading = (props) => {
  return (
    <React.Fragment>
      <div className="loading d-flex justify-content-center align-self-center">
        <img alt="" src={LoadingImg} />
      </div>
    </React.Fragment>
  );
};

export default Loading;

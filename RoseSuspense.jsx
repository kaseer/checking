import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingScreen from "./components/common/LoadingScreen";

function RoseSuspense({ children }) {
  const { pathname } = useLocation();

  const loaderHandler = (path) => {
    if (path === "/payment-successful") return null;
    return <LoadingScreen />;
  };

  return <Suspense fallback={loaderHandler(pathname)}>{children}</Suspense>;
}

RoseSuspense.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RoseSuspense;

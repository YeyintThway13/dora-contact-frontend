import React, { useEffect, useState } from "react";
import "./messageBox.css";

const MessageBox = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 6000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }
  return (
    <span className={`message ${props.variant || "error"}`}>
      {props.children}
    </span>
  );
};

export default MessageBox;

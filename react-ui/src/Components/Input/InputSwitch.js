import React, { useEffect, useState } from "react";
import { Moon, Sun } from "../Logos/Logo";
import { useStateValue } from "../../Context/StateProvider";
import "./InputSwitch.css";
function InputSwitch() {
  const [show, setShow] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    if (show) {
      dispatch({
        type: "DARK_MODE",
      });
    } else {
      dispatch({
        type: "LIGHT_MODE",
      });
    }
  }, [dispatch, show]);
  return (
    <div
      className="inputS"
      onClick={() => setShow(!show)}
      style={{
        background: !show ? "#171c28" : "white",
        border: !show ? "2px  solid #171c28" : " 2px solid white",
      }}
    >
      <div
        className="inputS__round"
        style={{ marginLeft: show && 60, background: show ? "blue" : "white" }}
        onClick={() => setShow(!show)}
      >
        {show ? <Moon /> : <Sun />}
      </div>
    </div>
  );
}

export default InputSwitch;

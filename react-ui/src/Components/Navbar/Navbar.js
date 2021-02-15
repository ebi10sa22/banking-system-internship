import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Navbar.css";
import { useStateValue } from "../../Context/StateProvider";
import InputSwitch from "../Input/InputSwitch";
import HamburgerMenu from "react-hamburger-menu";
import { Link } from "react-router-dom";
function Navbar() {
  const [state, dispatch] = useStateValue();
  const options = ["Home", "Create", "Transfer", "History"];
  const [showOptions, setOption] = useState(true);
  const [size, setSize] = useState(0, 0);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [size]);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset || 50;
    const handleScroll = () => {
      if (window.scrollY > 50) {
        dispatch({
          type: "SHOW_UP_ARROW",
        });
      } else {
        dispatch({
          type: "HIDE_UP_ARROW",
        });
      }
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;
      prevScrollPos = currentScrollPos;
      if (state.navbar !== visible) {
        dispatch({
          type: "NAVBAR",
          items: {
            navbar: visible,
          },
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, state?.navbar]);
  return (
    <div
      className="navbar"
      style={{
        opacity: state.navbar ? 1 : 0,
        transform: state?.navbar ? "translateY(0px)" : "translateY(-1000vh)",
        backgroundColor: state?.theme ? "#000000" : "#0F1251",
        height: !showOptions ? "100%" : "",
      }}
    >
      <div className="navbar__inside">
        <div className="navbar__logo"><p>I-BANK</p></div>
        <div className="navbar__menu">
          <span onClick={() => setOption(!showOptions)} className="navicon">
            <HamburgerMenu
              borderRadius={2}
              isOpen={!showOptions}
              width={30}
              height={20}
              menuClicked={() => setOption(!showOptions)}
              strokeWidth={2}
              color={!state.theme ? "#ffffff" : "#aaaaaa"}
            />
          </span>
        </div>
      </div>
      <div
        className="navbar__options"
        style={{
          transform:
            showOptions && size < 780
              ? "translateY(-1000px)"
              : "translateY(0px)",
          opacity: showOptions && size < 780 ? 0 : 1,
          borderRadius: showOptions && size < 780 && "50%",
          color: showOptions && window.screen.width < 780 && "#171c28",
        }}
      >
        {options.map((option, i) => (
          <Link
            key={i}
            onClick={() => {
              setOption(true);
              if (option === "History" || option === "Transfer") {
                dispatch({
                  type: "TABLE_CONFIG",
                  item: { table_config: option.toLowerCase() },
                });
              }
            }}
            to={`${option === "Home" ? "/" : "/" + option.toLowerCase()}`}
            style={{ color: state.theme ? "white" : "#E1E1E1" }}
          >
            {option}
          </Link>
        ))}
        <InputSwitch />
      </div>
    </div>
  );
}

export default Navbar;

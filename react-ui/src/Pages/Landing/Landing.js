import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../Context/StateProvider";
import "./Landing.css";

const useStyles = makeStyles({
  btn: {
    padding: "10px 40px",
    marginRight: "20px",
    border: "2px solid blue",
    fontWeight: 800,
    marginBottom: 20,
  },
});

function Landing() {
  const classes = useStyles();
  const [state] = useStateValue();
  let a = new Date();
  console.log(a)
  return (
    <div className="landing">
      <div className="landing__content">
        <h1 style={{ color: state.theme ? "white" : "#171c28" }}>
          WELCOME ALL !
        </h1>
        <p style={{ color: state.theme ? "white" : "#171c28" }}>
          Create Account , Make Transcation !
        </p>
        <div className="landing__buttons">
          <Link to="/create">
            <Button
              className={classes.btn}
              variant={"contained"}
              color={state.theme ? "secondary" : "#0F1251"}
            >
              Create
            </Button>
          </Link>
          <Link to="/transfer">
            <Button
              className={classes.btn}
              variant={"contained"}
              color={state.theme ? "primary" : "#0F1251"}
            >
              Transfer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

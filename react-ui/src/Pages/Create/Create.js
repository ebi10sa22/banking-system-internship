import { Backdrop, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../Context/StateProvider";
import "./Create.css";
import Lottie from "react-lottie-player";
import CreateLottie from "../../assests/lottie/create.json";

const useStyles = makeStyles((theme) => ({
  backbutton: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#464646e7",
  },
  btn: {
    marginRight: "20px",
  },
  btn2: {
    marginTop: 20,
  },
}));

function Create() {
  const classes = useStyles();
  const [state] = useStateValue();
  const [nameInput, setName] = useState("");
  const [emailInput, setEmail] = React.useState("");
  const [mobileInput, setMobile] = React.useState("");
  const [dateInput, setDate] = React.useState("");
  const [balanceInput, setBalance] = React.useState(0);
  const [checkInput, setCheck] = React.useState(false);

  const [show, setShow] = useState(false);
  const [back, setBack] = useState(true);
  const [err, setError] = useState();
  const submit = (e) => {
    e.preventDefault();
    if (nameInput.length > 1) {
      if (emailInput.length > 1) {
        if (mobileInput.length === 10) {
          if (dateInput !== null) {
            if (checkInput === true) {
              setShow(!show);
              axios
                .post("/users/create_user", {
                  name: nameInput,
                  email: emailInput,
                  mobile: mobileInput,
                  date_of_birth: dateInput,
                  balance: balanceInput,
                })
                .then((res) => {
                  console.log(res);
                  setError(res.data.code);
                  setBack(res.data.status);
                })
                .catch((err) => {
                  setBack(!back);
                  setError(20);
                });
            }
          }
        }
      }
    }
  };
  return (
    <div className="create">
      {/* Successfully created*/}
      <Backdrop open={!back && show} className={classes.backbutton}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lottie
            loop={false}
            animationData={CreateLottie}
            style={{ width: "300px", height: "300px" }}
            play={show}
            speed={1}
            // onComplete={() => {
            //   alert("Compleyed");
            // }}
          />
          <Link to="/transfer">
            <Button
              className={classes.btn}
              variant={state.theme ? "contained" : "contained"}
              color={state.theme ? "primary" : "secondary"}
            >
              Go to Transfer
            </Button>
          </Link>
        </div>
      </Backdrop>

      <div
        className="create__content"
        style={{
          backgroundColor: state.theme ? "#0A0A0A" : "white",
          marginTop : "-10px"
        }}
      >
        <form onSubmit={(e) => submit(e)}>
          <div className="create__input">
            <p style={{ color: state.theme ? "white" : "#171c28" }}>Name</p>
            <input
              required
              style={{
                color: !state.theme ? "white" : "#171c28",
                backgroundColor: state?.theme ? "white" : "#dcdcdc",
              }}
              type="text"
              placeholder={"Your name"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="create__input">
            <p
              style={{
                color: state.theme ? "white" : "#171c28",
              }}
            >
              Date of birth
            </p>
            <input
              required
              style={{
                color: !state.theme ? "black" : "#171c28",
                backgroundColor: state?.theme ? "white" : "#dcdcdc",
              }}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="create__input">
            <p style={{ color: state.theme ? "white" : "#171c28" }}>
              Email Address
              <br />
              {(err === 20 || err === 5) && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  *E-mail Already exists
                </span>
              )}
            </p>
            <input
              style={{
                color: !state.theme ? "white" : "#171c28",
                backgroundColor: state?.theme ? "white" : "#dcdcdc",
              }}
              required
              type="email"
              placeholder={"Your E-mail address"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="create__input">
            <p style={{ color: state.theme ? "white" : "#171c28" }}>
              Mobile Number
              <br />
              {(err === 20 || err === 10) && (
                <span style={{ fontSize: "14px", color: "red" }}>
                  *Mobile Number Already exists
                </span>
              )}
            </p>
            <input
              required
              type="tel"
              maxLength="10"
              max="10"
              style={{
                color: !state.theme ? "white" : "#171c28",
                backgroundColor: state?.theme ? "white" : "#dcdcdc",
              }}
              placeholder={"Your Mobile number"}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="create__input">
            <p style={{ color: state.theme ? "white" : "#171c28" }}>Balance</p>
            <input
              style={{
                color: state.theme ? "black" : "#171c28",
                backgroundColor: state?.theme ? "white" : "#dcdcdc",
              }}
              required
              type="number"
              placeholder={"Your Balance"}
              value={balanceInput}
              max={1000000000000000000000000}
              min={0}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className="create__input checkbox">
            <span
              style={{
                color: state.theme ? "white" : "#171c28",
              }}
            >
              <input
                required
                className="check"
                type="checkbox"
                onClick={() => setCheck(!checkInput)}
              />
              &nbsp; Please ensure that you are ready to open your account
            </span>
          </div>
          <div className="btn">
            <Button
              type="submit"
              variant={state.theme ? "contained" : "outlined"}
              color={state.theme ? "primary" : "secondary"}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;

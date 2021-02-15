import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Backdrop, Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useStateValue } from "../../Context/StateProvider";
import "./Table.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Lottie from "react-lottie-player";
import SendingLottie from "../../assests/lottie/sending.json";
import LoadingLottie from "../../assests/lottie/loading.json";

const useStyles = makeStyles((theme) => ({
  div: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
  paper: {
    marginTop: "20px",
    width: "90%",
    backgroundColor: "transparent",
  },
  container: {
    maxHeight: 500,
  },
  table: {
    minWidth: 650,
    overflowX: "scroll",
  },
  backdrop: { zIndex: theme.zIndex.drawer + 1, backgroundColor: "#464646e7" },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(4),
  },
  backdrop2: {
    backgroundColor: "aqua",
  },
}));
export default function Tables() {
  const classes = useStyles();
  const nodeRef = React.useRef(1);

  const [state] = useStateValue();
  const [rows, setRows] = useState([]);
  const [back, setBack] = useState(false);
  const [sender, setSender] = useState({
    name: "",
    id: "",
    email: "",
    balance: null,
  });
  const [reciver, setReciver] = useState("");
  const [transfer_money, setTransfer] = useState();
  const [success, setSuccess] = useState(false);
  const [nextBtn, showButton] = useState(false);
  const [count, setCount] = useState(0);
  const [details, showDetails] = useState(false);

  let head = ["S.No", "Account Number", "Name", "Balance", " Transfer Money"];

  React.useEffect(() => {
    getDetatils();
    return () => {};
  }, [state.table_config]);

  const getDetatils = () => {
    console.log("Detatils");
    let type = window.location.pathname;
    axios
      .get("/users" + type.toString())
      .then((res) => setRows(res.data.data))
      .catch((err) => console.log(err));
  };
  const postDetails = () => {
    setSuccess({ ...success, show: true });
    axios
      .post("/users/transfer_money", {
        sender: {
          name: sender.name,
          email: sender.email,
          id: sender.id.toString(),
          balance: sender.balance - transfer_money,
        },
        reciver: {
          id: reciver,
          recived: parseInt(transfer_money),
        },
      })
      .then((res) => setSuccess(true))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
        {rows.length > 0 ? (
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className={classes.table}
            >
              <TableHead
                style={{
                  zIndex: 1000,
                }}
              >
                <TableRow>
                  {head.map((h, i) => (
                    <TableCell
                      style={{
                        color: state.theme ? "white" : "#171c28",
                        backgroundColor: !state.theme
                          ? "lightcoral"
                          : "#171c28",
                      }}
                      key={i}
                      align="center"
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > -1 &&
                  rows.map((row, i) => (
                    <TableRow
                      key={i}
                      style={{
                        background: !state.theme ? "lightgray" : "gray",
                      }}
                    >
                      <TableCell
                        style={{
                          color: state.theme ? "white" : "#171c28",
                        }}
                        align="center"
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          showDetails(!details);
                        }}
                        className="id"
                        style={{
                          textDecoration: "underline",
                          color: state.theme ? "white" : "#171c28",
                        }}
                        align="center"
                      >
                        {row._id}
                      </TableCell>
                      <TableCell
                        style={{
                          color: state.theme ? "white" : "#171c28",
                        }}
                        align="center"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell
                        style={{
                          color: state.theme ? "white" : "#171c28",
                        }}
                        align="center"
                      >
                        {row.balance}
                      </TableCell>
                      <TableCell
                        style={{
                          color: state.theme ? "white" : "#171c28",
                        }}
                        align="center"
                      >
                        <Button
                          onClick={() => {
                            setBack(!back);
                            setSender({
                              name: row.name,
                              id: row._id,
                              balance: row.balance,
                              email: row.email,
                            });
                          }}
                          variant={state.theme ? "contained" : "outlined"}
                          color={state.theme ? "primary" : "secondary"}
                        >
                          Transfer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {/* CUSTOMER details */}
            {/* <Backdrop ref={nodeRef} open={details} className={classes.backdrop}>
              <div
                className="details"
                style={{
                  width: window.innerWidth > 780 ? "80%" : "50%",
                  backgroundColor: "aqua",
                }}
              >
                <h1>User Details</h1>
               <div className="detail">
               </div>
              </div>
            </Backdrop> */}
            {/* Trnasfer Money Backdrop */}
            <Backdrop ref={nodeRef} open={back} className={classes.backdrop}>
              <div className="transfer__box">
                <FormControl className={classes.formControl} disabled>
                  <NativeSelect value={sender.name}>
                    <option value={sender.name}>{sender.name}</option>
                  </NativeSelect>
                  <FormHelperText>Sender</FormHelperText>
                </FormControl>
                <FormControl className={classes.selectEmpty}>
                  <NativeSelect
                    value={reciver}
                    onChange={(e) => setReciver(e.target.value)}
                  >
                    <option value={""} defaultValue />
                    {rows.map((row) => {
                      return (
                        row._id !== sender.id && (
                          <option value={row._id} key={row._id}>
                            &nbsp;{row.name}
                          </option>
                        )
                      );
                    })}
                  </NativeSelect>
                  <FormHelperText>Reciver</FormHelperText>
                </FormControl>
                <FormControl className={classes.selectEmpty}>
                  <TextField
                    error={transfer_money > sender.balance}
                    id="standard-number"
                    label="Number"
                    type="number"
                    value={transfer_money}
                    onChange={(e) => setTransfer(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <FormHelperText>
                    {sender.balance === 0
                      ? "You cannot send Money."
                      : `Enter less than ${sender.balance}`}
                  </FormHelperText>
                </FormControl>
                <Button
                  className={classes.button}
                  disabled={
                    sender.balance === 0 ||
                    transfer_money > sender.balance ||
                    reciver.length === 0
                  }
                  variant={state.theme ? "contained" : "outlined"}
                  color={state.theme ? "primary" : "secondary"}
                  onClick={() => postDetails()}
                >
                  Transfer
                </Button>
                <Button
                  className={classes.selectEmpty}
                  onClick={() => {
                    setBack(false);
                    setReciver("");
                    setSender({ name: "", id: "", balance: 0, email: "" });
                    setTransfer(0);
                  }}
                  variant="text"
                >
                  Go Back
                </Button>
              </div>
            </Backdrop>

            {/* Success Transfer Backdrop */}
            <Backdrop
              open={success}
              className={[classes.backdrop, classes.backdrop2]}
            >
              <div className="sending__money">
                <Lottie
                  animationData={SendingLottie}
                  background="transparent"
                  speed={1}
                  style={{ width: "300px", height: "300px" }}
                  play={success}
                  loop={false}
                  onComplete={() => {
                    showButton(true);
                  }}
                />
                {nextBtn && (
                  <Button
                    className={classes.selectEmpty}
                    style={{
                      background: !state.theme ? "white" : "#171c28",
                      color: state.theme ? "white" : "#171c28",
                      padding: "10px  20px",
                    }}
                    onClick={() => {
                      getDetatils();
                      setBack(false);
                      showButton(false);
                      setReciver("");
                      setSender({ name: "", id: "", balance: null, email: "" });
                      setTransfer(0);
                      setSuccess(false);
                    }}
                    variant="contained"
                  >
                    Go Back
                  </Button>
                )}
              </div>
            </Backdrop>
          </TableContainer>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100vh",
              dislay: "flex",
              flexDirection: "column",
              backgroundColor: "lightgray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {count < 3 ? (
              <Lottie
                animationData={LoadingLottie}
                play={count < 3}
                loop
                style={{ width: "100%", height: "100%" }}
                onLoopComplete={() => {
                  setCount(count + 1);
                }}
              />
            ) : (
              <div className="history">
                <h1>History Not found !</h1>
              </div>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
}

import React from "react";
import "./Table.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { useStateValue } from "../../Context/StateProvider";
import Lottie from "react-lottie-player";
import LoadingLottie from "../../assests/lottie/loading.json";

const useRowStyles = makeStyles({
  root: {
    width: "100%",
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
    marginTop: 5,
    overflowX: "scroll",
  },
  paper: {
    marginTop: "20px",
    width: "90%",
    backgroundColor: "transparent",
  },
  container: {
    maxHeight: 500,
  },
  div: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [state] = useStateValue();
  const sender = [
    "Account Number",
    "Name",
    "Amount Sent",
    "Balance Amount (in Rs)",
  ];
  const reciver = [
    "Account Number",
    "Name",
    "Amount Recived",
    "Total Amount (in Rs)",
  ];
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          style={{
            color: state.theme ? "white" : "#171c28",
          }}
          align="center"
        >
          {props?.sno + 1}
        </TableCell>
        <TableCell
          style={{
            color: state.theme ? "white" : "#171c28",
          }}
          align="center"
        >
          {row?.sender_name}
        </TableCell>
        <TableCell
          style={{
            color: state.theme ? "white" : "#171c28",
          }}
          align="center"
        >
          {row?.reciver_name}
        </TableCell>
        <TableCell
          style={{
            color: state.theme ? "white" : "#171c28",
          }}
          align="center"
        >
          {row?.date}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                style={{
                  color: state.theme ? "#eee8aa" : "#171c28",
                }}
                variant="h6"
                gutterBottom
                component="div"
              >
                Sender History
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {sender.map((s, i) => (
                      <TableCell
                        style={{
                          color: state.theme ? "cornsilk" : "#171c28",
                        }}
                        key={i}
                        align="center"
                      >
                        {s}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell
                      style={{
                        color: state.theme ? "white" : "#171c28",
                      }}
                      align="center"
                    >
                      {row?.sender_account}
                    </TableCell>
                    <TableCell
                      style={{
                        color: state.theme ? "white" : "#171c28",
                      }}
                      align="center"
                    >
                      {row?.sender_name}
                    </TableCell>
                    <TableCell
                      style={{
                        color: state.theme ? "white" : "#171c28",
                      }}
                      align="center"
                    >
                      {row?.amt_sent}
                    </TableCell>
                    <TableCell
                      style={{
                        color: state.theme ? "white" : "#171c28",
                      }}
                      align="center"
                    >
                      {row?.sender_balance}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Typography
              style={{
                color: state.theme ? "#eee8aa" : "#171c28",
              }}
              variant="h6"
              gutterBottom
              component="div"
            >
              Reciver History
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  {reciver.map((r, i) => (
                    <TableCell
                      style={{
                        color: state.theme ? "cornsilk" : "lightgray",
                      }}
                      key={i}
                      align="center"
                    >
                      {r}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell />
                  <TableCell
                    style={{
                      color: state.theme ? "white" : "#171c28",
                    }}
                    align="center"
                  >
                    {row?.reciver_account}
                  </TableCell>
                  <TableCell
                    style={{
                      color: state.theme ? "white" : "#171c28",
                    }}
                    align="center"
                  >
                    {row?.reciver_name}
                  </TableCell>
                  <TableCell
                    style={{
                      color: state.theme ? "white" : "#171c28",
                    }}
                    align="center"
                  >
                    {row?.amt_recived}
                  </TableCell>
                  <TableCell
                    style={{
                      color: state.theme ? "white" : "#171c28",
                    }}
                    align="center"
                  >
                    {row?.reciver_balance}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([]);
  const nodeRef = React.useRef(1);
  const [state] = useStateValue();
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    function fetchData() {
      let type = window.location.pathname === "/history" && "/show_history";
      axios
        .get("/users" + type.toString())
        .then((res) => {
          setRows(res.data.data);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
    return () => {};
  }, [state.table_config]);

  const classes = useRowStyles();
  const head = ["Serial no", "Sender Name", "Reciver Name", "Transcation time"];
  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
        {rows.length > 0 ? (
          <TableContainer className={classes.container} ref={nodeRef}>
            <Table
              stickyHeader
              aria-label="collapsible table"
              className={classes.table}
            >
              <TableHead
                style={{
                  zIndex: 1000,
                }}
              >
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: !state.theme ? "lightcoral" : "#171c28",
                    }}
                  />
                  {head.map((h, i) => (
                    <TableCell
                      style={{
                        backgroundColor: !state.theme
                          ? "lightcoral"
                          : "#171c28",
                        color: state.theme ? "white" : "#171c28",
                      }}
                      key={i}
                      align="center"
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  backgroundColor: !state.theme ? "#d3d3d3" : "gray",
                  color: state.theme ? "white" : "#171c28",
                }}
              >
                {rows.length > 0 &&
                  rows.map((row, i) => <Row key={i} row={row} sno={i} />)}
              </TableBody>
            </Table>
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
            {count === 0 ? (
              <Lottie
                animationData={LoadingLottie}
                play={count === 0}
                loop
                onLoopComplete={() => setCount(count + 1)}
                style={{ width: "100%", height: "100%" }}
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

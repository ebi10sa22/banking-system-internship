const express = require("express");
const router = express.Router();
const path = require("path");
const { ObjectId } = require("mongodb");

const db = require("../db");

const Account = require("../modals/Account");
const Transcation = require("../modals/Transcation");

router.post("/create_user", (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  if (!body) {
    return res.send("Not valid");
  }
  const acc = new Account({
    name: body.name,
    email: body.email,
    mobile: body.mobile,
    balance: body.balance,
    date_of_birth: body.date_of_birth,
  });
  if (!acc) {
    return res
      .status(400)
      .send("The credientials you have given is not proper");
  }
  db.collection("user_accounts")
    .find(
      { $or: [{ email: body.email }, { mobile: body.mobile }] },
      { $exists: true }
    )
    .toArray((err, result) => {
      var email_mobile = false;
      var mobile = false;
      var email = false;
      if (result.length !== 0) {
        for (var i = 0; i < result.length; i++) {
          if (
            result[i].mobile === body.mobile &&
            result[i].email === body.email
          ) {
            email_mobile = true;
            break;
          } else if (result[i].mobile === body.mobile) {
            mobile = true;
            break;
          } else {
            email = true;
            break;
          }
        }
        if (email_mobile) {
          return res.send({
            status: false,
            code: 20,
            message: "Mobile Number and email exists",
          });
        } else if (email) {
          return res.send({
            status: false,
            code: 5,
            message: "Email exists",
          });
        } else if (mobile) {
          return res.send({
            status: false,
            code: 10,
            message: "Mobile Number exists",
          });
        }
      }
      acc
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            id: acc.id,
            code: 100,
            message: "Account Created",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            err,
            code: 50,
            message: "Account not created due to some issues",
          });
        });
    });
});

router.get("/transfer", (req, res, next) => {
  console.log("get you");
  db.collection("user_accounts")
    .find({})
    .toArray((err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      return res.status(201).json({ status: true, data: result });
    });
});

router.post("/transfer_money", (req, res, next) => {
  const body = req.body;

  const Senderquery = {
    _id: ObjectId(body.sender.id),
    email: body.sender.email,
  };

  const receiverQuery = {
    _id: ObjectId(body.reciver.id),
  };
  const newData = { $set: { balance: body.sender.balance } };
  db.collection("user_accounts").updateOne(
    Senderquery,
    newData,
    (err, result) => {
      if (err) {
        throw err;
      }
      db.collection("user_accounts").findOne(receiverQuery, (err, results) => {
        if (err) {
          throw err;
        }
        let name = results.name;
        let bal = results.balance + body.reciver.recived;
        db.collection("user_accounts").updateOne(
          receiverQuery,
          { $set: { balance: bal } },
          (e, r) => {
            if (e) {
              throw err;
            }
            const senderParam = {
              account: body.sender.id,
              sent: body.reciver.recived,
              balance: body.sender.balance,
            };
            const reciverParam = {
              account: body.reciver.id,
              balance: bal,
              recived: body.reciver.recived,
            };
            res.redirect(
              "/users/history?sender=" +
                senderParam.account +
                "&amt_sent=" +
                senderParam.sent +
                "&sender_name=" +
                body.sender.name +
                "&sender_balance=" +
                senderParam.balance +
                "&reciver=" +
                reciverParam.account +
                "&recived_amt=" +
                reciverParam.recived +
                "&reciver_bal=" +
                reciverParam.balance +
                "&reciver_name=" +
                name
            );
          }
        );
      });
    }
  );
});
router.get("/history", (req, res, next) => {
  const data = {
    sender_account: req.query.sender,
    amt_sent: req.query.amt_sent,
    sender_balance: req.query.sender_balance,
    sender_name: req.query.sender_name,
    reciver_name: req.query.reciver_name,
    reciver_account: req.query.reciver,
    amt_recived: req.query.recived_amt,
    reciver_balance: req.query.reciver_bal,
  };
  let date = new Date().toLocaleString().replace(",", "");

  const acc = new Transcation({
    date: date,
    sender_account: data.sender_account,
    amt_sent: parseInt(data.amt_sent),
    sender_balance: parseInt(data.sender_balance),
    sender_name: data.sender_name,
    reciver_name: data.reciver_name,
    reciver_account: data.reciver_account,
    amt_recived: parseInt(data.amt_recived),
    reciver_balance: parseInt(data.reciver_balance),
  });

  if (!acc) {
    return res.send({
      status: 400,
      message:
        "Credientials provided cannot be accepted by the Schema provided",
    });
  }

  acc
    .save()
    .then((r) => {
      return res.status(201).json({
        success: true,
        message: "History Created",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        err,
        message: "Cannot process your request",
      });
    });
});

router.get("/show_history", (req, res) => {
  db.collection("histories")
    .find({})
    .toArray((error, result) => {
      if (error) {
        throw error;
      }
      return res.send({ status: 201, data: result });
    });
});

router.get("/delete_user", (req, res) => {
  db.collection("user_accounts").deleteMany({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
        message: "May be not found or Enter the data correctly",
      });
    }
    return () => {
      res
        .status(200)
        .json({ success: true, data, message: "Deleted successfully" });
    };
  });
});
router.get("/delete_history", (req, res) => {
  db.collection("histories").deleteMany({}, (err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
        message: "May be not found or Enter the data correctly",
      });
    }
    return () => {
      res
        .status(200)
        .json({ success: true, data, message: "Deleted successfully" });
    };
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Payment = require("../model/payment");

router.get("/", (request, response, next) => {
  Payment.find()
    .then((result) => {
      response.status(200).json({
        paymentData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (request, response, next) => {
  Payment.find({ _id: request.params.id })
    .exec()
    .then((result) => {
      response.status(200).json({
        product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
  console.log("hereee");
});

router.post("/", (request, response, next) => {
  const payment = new Payment({
    _id: new mongoose.Types.ObjectId(),
    userName: request.body.userName,
    email: request.body.email,
    phone: request.body.phone,
    amount: request.body.amount,
  });

  payment
    .save()
    .then((result) => {
      console.log(result);
      response.status(200).json({
        newPayment: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Payment.remove({ code: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "ID removed",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.delete("/", (req, res, next) => {
  Payment.deleteMany({})
    .then((result) => {
      res.status(200).json({
        message: "Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Payment.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        userName: request.body.userName,
        email: request.body.email,
        phone: request.body.phone,
        amount: request.body.amount,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_paymentData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;

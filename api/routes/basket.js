const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Basket = require("../model/basket");
const QRCode = require("qrcode");
const JsBarcode=require("jsbarcode")
const Jimp = require("jimp");
const fs = require("fs");
const qrCodeReader = require("qrcode-reader");
// const buffer = fs.readFileSync('C:/Users/Tehreem-PC/Desktop/UNI/API/FYP/SignUp/outputQR/file.png');

router.get("/", (request, response, next) => {
  Basket.find()
    .then((result) => {
      response.status(200).json({
        basketData: result,
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
  Basket.find({ code: request.params.id })
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
  const basket = new Basket({
    _id: new mongoose.Types.ObjectId(),
    basketName: request.body.basketName,
    code: request.body.code,
    status: request.body.status,
  });
  QRCode.toFile(
    `C:/Users/Tehreem-PC/Desktop/UNI/API/FYP/SignUp/outputQR/${request.body.code}.png`,
    `${request.body.code}`,
    {
      errorCorrectionLevel: "H",
    },
    function (err) {
      if (err) throw err;
      console.log("QR code saved!");
    }
  );

  basket
    .save()
    .then((result) => {
      console.log(result);
      response.status(200).json({
        newBasket: result,
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
  Basket.remove({ code: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "basketId removed",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.delete('/',(req,res,next)=>{
    Basket.deleteMany({})
    .then(result =>{
        res.status(200).json({
            message: 'Deleted',
            result:result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})

router.put("/:id", (req, res, next) => {
  Basket.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        basketName: req.body.basketName,
        code: req.body.code,
        status: req.body.status,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_basketData: result,
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

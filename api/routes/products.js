const Product = require("../model/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const cloudinary = require("cloudinary").v2;
const QRCode = require("qrcode");
//const Jimp = require("jimp");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dhzmpfkvz",
  api_key: "295597321971433",
  api_secret: "mkL52Cw5r0goTpgSU_QUOv1uJ7w",
});

// fetch
router.get("/", (request, response, next) => {
  Product.find()
    .then((result) => {
      response.status(200).json({
        productData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});
//fetch with id
router.get("/:id", (request, response, next) => {
  console.log(request.params.id);
  Product.find({ code: request.params.id })
    .exec()
    // Product.find(request.params.id)
    // Product.findById(request.params.id)
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
});

// router.get('/:id', (request,response,next)=>{
//     console.log(request.params.id);
//    Product.find(request.params.id)
//     Product.findById(request.params.id)
//     .then(result =>{
//         response.status(200).json({
//             product:result
//         })
//     })
//     .catch(err=>{
//         console.log(err);
//         response.status(500).json({
//             error:err
//         })
//     })
// })

//add
router.post("/", (request, response, next) => {
  console.log(request.body);
   const file = request.files.photo; //frontside se jo naam aarha usske mutabik change name "photo"
  //console.log
  // console.log(request.body.productName, request.body.code, request.body.quantity);
   cloudinary.uploader.upload(file.tempFilePath, (err,result)=>{
       console.log(result);
  //     console.log("checkpost 101")
  product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName: request.body.productName,
        code: request.body.code,
        quantity: request.body.quantity,
        price: request.body.price,
        image: request.body.image,
      });
      console.log("checkpost102");
    
      QRCode.toFile(
        `D:/uni/backend/FYP_QuickMart/outputProducts/${request.body.code}.png`,
        `${request.body.code}`,
        {
          errorCorrectionLevel: "H",
        },
        function (err) {
          if (err) throw err;
          console.log("QR code saved!");
        }
      );
    
      product
        .save()
        .then((result) => {
          console.log(result);
          response.status(200).json({
            newProduct: result,
          });
        })
        .catch((err) => {
          console.log(err);
          response.status(500).json({
            error: err,
          });
        });
    });
  //    // console.log(request.body.productName, request.body.code, request.body.quantity);

   });
//    

router.delete("/", (req, res, next) => {
  Product.deleteMany({})
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
router.delete("/:id", (req, res, next) => {
  Product.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "productId removed",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
//update
router.put("/:id", (req, res, next) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        productName: req.body.productName,
        code: req.body.code,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_productData: result,
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

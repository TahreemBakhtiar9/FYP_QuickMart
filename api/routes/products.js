const Product = require('../model/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;


// update this part 
cloudinary.config({
    cloud_name: "dhzmpfkvz",
    api_key: "295597321971433",
    api_secret: "mkL52Cw5r0goTpgSU_QUOv1uJ7w"
  });

// fetch 
router.get('/', checkAuth, (request,response,next) => {
    Product.find()
    .then(result=>{
        response.status(200).json({
            productData: result
        });
    })
    .catch(err=>{
        console.log(err);
        response.status(500).json({
            error:err
        })
    })
})
//fetch with id
router.get('/:id', (request,response,next)=>{
    console.log(request.params.id);
    Product.findById(request.params.id)
    .then(result =>{
        response.status(200).json({
            product:result
        })
    })
    .catch(err=>{
        console.log(err);
        response.status(500).json({
            error:err
        })
    })
})

//add
router.post('/', (request,response,next) => {
    const file = request.files.photo; //frontside se jo naam aarha usske mutabik change name "photo"
    cloudinary.uploader.upload(file.tempFilePath, (err,result)=>{
        console.log(result);
        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            productName: request.body.productName,
            code: request.body.code,
            quantity: request.body.quantity,
            price: request.body.price,
            image: result.url
        })
        product.save()
        .then(result=>{
            console.log(result);
            response.status(200).json({
                newProduct: result
            })
        })
        .catch(err=>{
            console.log(err)
            response.status(500).json({
                error:err
            })
        })
    })
    
})


router.delete('/:id',(req,res,next)=>{
    Product.remove({_id:req.params.id})
    .then(result =>{
        res.status(200).json({
            message: 'productId removed',
            result:result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
})
//update
router.put('/:id',(req,res,next)=>{
    Product.findOneAndUpdate({_id:req.params.id},{
        $set:{
            productName: req.body.productName,
            code: req.body.code,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.body.image
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_productData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;
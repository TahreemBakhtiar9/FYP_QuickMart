const express = require('express');
const app = express();
const userRoute = require('./api/routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRoute = require('./api/routes/products');
const fileUpload = require('express-fileupload');
var Jimp = require("jimp");
var fs = require('fs')
var QrCode = require('qrcode-reader');

var buffer = fs.readFileSync(__dirname + '/image.png'); // scan input, read image &create a buffer

// //Parse the image  
// Jimp.read(buffer, function(err, image) {
//     if (err) {
//         console.error(err);
//     }
//     let qrcode = new QrCode();
//     qrcode.callback = function(err, value) {
//         if (err) {
//             console.error(err);
//         }
//         console.log(value.result);
//     };
//     qrcode.decode(image.bitmap);
//  });


mongoose.connect('mongodb+srv://TahreemBakhtiar:tahreem123@usersignup.prphnl3.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error', err=>{
    console.log("Connection failed");
});
mongoose.connection.on('connected', connected=>{
    console.log('connected with database successfully!');

});

app.use(fileUpload({
    useTempFiles:true
}))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/products', productsRoute);

// app.use((req,res,next)=>{
//     res.status(404).json({
//         error:"Bad URL Request"
//     })
// })





module.exports = app;
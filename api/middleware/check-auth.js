const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, 'token verification dummy text');
    //console.log(verify);
    //if(verify.Role == 'admin)(
        //next();
    //)
    //else{
    //     return res.status(401).json({
    //         msg:'not admin'
    //     })
    // }
    next();
    }

    catch(error){
        return res.status(401).json({
            msg:'invalid token'
    })
}
}
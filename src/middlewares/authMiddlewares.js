const jwt = require('jsonwebtoken');
const UserModel_SQL = require('../models/user_sql');
const requireAuth = (req, res, next) =>{
    //const token = req.cookies.jwt
    const token = req.headers.token;
    if(token){
        jwt.verify(token, 'user secret', (err, decodedToken)=>{
            if (err){
                console.log('lỗi auth');
                res.json('lỗi auth');
            }else{
                next();
            }
        });
    }
    else{
        console.log('lỗi auth');
    }
}

const checkAccount = (req, res, next)=>{
    const token = req.headers.token;
    if(token){
        jwt.verify(token, 'user secret',async (err, decodedToken)=>{
            console.log('decodedToken',decodedToken);
            if(err){
                res.locals.user = null;
                res.status(500).json('token khong hop le');
                next();
            }else{
                //console.log("decode",decodedToken)
                console.log('decodedToken',decodedToken);
                let user = await UserModel_SQL.findByPk(decodedToken.id);
                res.user = user;
                res.locals.user = user;
                //console.log("user middlewares", user)
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }   
    
    
}

module.exports = {requireAuth, checkAccount};
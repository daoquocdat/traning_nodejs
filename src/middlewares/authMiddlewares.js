const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'user secret', (err, decodedToken)=>{
            if (err){
                console.log('lỗi auth')
                console.log(err,message)
            }else{
                next()
            }
        })
    }
    else{
        console.log('lỗi auth')
    }
}

module.exports = {requireAuth}
const UserModel_SQL  = require('../../src/models/user_sql')
const UserActivityModel_MongoDB  = require('../../src/models/userActivity_mongo')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign( { id  }, 'user secret', { 
        expiresIn: maxAge 
    })
}

class UserController {
    index(req, res, next){
        res.send('abc');
    }
    //hàm đăng ký 
    async register(req, res, next){
        var password = req.body.password 
        const salt = await bcrypt.genSalt()
        password  = await bcrypt.hash(password, salt)
        const user = UserModel_SQL.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password,
            phone: req.body.phone,
            address: req.body.address,
        })
        .then((user) => {
            const name = user.firstName +' '+ user.lastName;
            const email = user.email
            //create user activity
            const userActivity = new UserActivityModel_MongoDB({
                email: email,
                name: name,
                activity: {
                    $push: {
                        nameActivities: 'create',
                        time: user.dataValues.createdAt,
                    }  
                },
            })
            .save()
            .then((userActivity) => {
                console.log('thêm thành công')
                const token = createToken(user.id)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
                res.json(token)
            })
            .catch((err) =>{
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        });
    }

    async view(req, res, next){
        await UserModel_SQL.findAll({})
            .then((listUser) => {
                res.json(listUser);
            })
            .catch(next);
    }

    async login(req, res, next){
        const  email = req.body.email;
        const  password = req.body.password;
        try{
            await UserModel_SQL.findOne({
                where: {email: email}
            })
            .then(async (account) => {
                console.log(account)
                const auth = await bcrypt.compare(password, account.password)
                console.log(auth)
                if(auth){
                    const token = createToken(account.id)
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
                    res.json( { account: account.id })
                }
            })
            .catch(next);
            
        }
        catch(err){
            const errors = err
            console.log("loi",err)
            res.json({ error: 'Sai tài khoản hoặc mật khẩu' })
        }
    }     
    logout(req, res, next){
        res.cookie('jwt', '', { maxAge: 1 })
        res.json( { status:'logout' })
    }
    
}
module.exports= new UserController
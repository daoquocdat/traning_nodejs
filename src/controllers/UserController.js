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
            var name
            if(user.lastName != undefined || user.lastName!=''){
                name = user.firstName +' '+ user.lastName;
            }
            else{
                name = user.firstName
            }
            const email = user.email
            //create user activity
            const userActivity = new UserActivityModel_MongoDB({
                email: email,
                name: name,
                activity: {
                    nameAc: 'create',
                    time: user.createdAt,
                },
            })
            .save()
            .then((userActivity) => {
                console.log('thêm thành công', userActivity)
                const token = createToken(user.userid)
                //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
                res.status = res.statusCode
                next()
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
                res.status = res.statusCode
                res.listUser = listUser
                next()
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
                const auth = await bcrypt.compare(password, account.password);
                if(auth){
                    const token = createToken(account.userid);
                    const dateTime = new Date(Date.now());
                    //update user activity
                    const user = UserActivityModel_MongoDB.updateOne({
                            email: account.email
                        },{
                            $push: {
                                activity: {
                                    nameAc: 'login',
                                    time: dateTime
                                } 
                        },
                    }).then(()=>{
                        console.log('update activities succesfully')
                        res.status = res.statusCode
                        res.account = account
                        next()
                    })
                    .catch((res)=>{
                        console.log(res)
                        next()
                    })
                    
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
        console.log(res.user)
        const dateTime = new Date(Date.now());
        const user = UserActivityModel_MongoDB.updateOne({
                email: res.user.email
            },{
                $push: {
                    activity: {
                        nameAc: 'logout',
                        time: dateTime
                    } 
            },
        }).then(()=>{
            console.log('update activities succesfully')
            res.status = res.statusCode
            res.message = 'logout'
            next()
        })
        .catch((res)=>{
            console.log(res)
        })
        
    }
    
}
module.exports= new UserController
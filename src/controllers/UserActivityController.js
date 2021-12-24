
const UserActivityModel_MongoDB  = require('../../src/models/userActivity_mongo');

class UserActivityController {
    activity(req, res, next){
        const userActivity = UserActivityModel_MongoDB.findOne({
            _id: req.params.id
        })
        .then((userActivity) =>{
            res.json(userActivity);
        })
        .catch((err) => {
            console.log(err);
        })
    }  
}
module.exports= new UserActivityController;
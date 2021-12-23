const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const activities = new Schema({
    email: {
        type: String
    },
    name: {
        type: String
    },
    activity: [{
        nameActivities:{
            type: String
        },
        time:{ 
            type: Date, 
            default: Date.now
        }
    }],
})

module.exports = mongoose.model('activities',activities,'user_activities')
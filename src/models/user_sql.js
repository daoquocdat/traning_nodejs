const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../src/config/sql/sqlDB')

const User =  sequelize.define('user', {
    // Model attributes are defined here
    userid:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
    }

}, {
    // Other model options go here
    tableName: 'user'
  });


module.exports = User
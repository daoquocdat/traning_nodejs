const { Sequelize  } = require('sequelize')

const db = new Sequelize('user', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,  
})

try {
     db.authenticate();
    console.log('Connection SQL successfully.');
}
catch (error) {
    console.error('Connection SQL fail.', error);
}

module.exports = db
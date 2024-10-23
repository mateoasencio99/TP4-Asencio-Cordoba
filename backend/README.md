
https://sequelize.org/docs/v6/getting-started/

npm install --save sequelize
npm install --save sqlite3

# Configure Sequelize to connect with Sqlite DB 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

# Test the connection 
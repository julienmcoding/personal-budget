const { connect, connection } = require('mongoose');
const { config } = require('dotenv'); 


/*We'll use module.exports since we want to import this file in our server.js*/

module.exports = () => {
 config(); //invoking the dotenv config here
 const uri = process.env.DB_URI;

 connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            console.log('Connection estabislished with MongoDB');
        })
        .catch(error => console.error(error.message));
};

connection.on('connected', () => {
    console.log('Mongoose connected to DB Cluster');
})

connection.on('error', (error) => {
    console.error(error.message);
})

connection.on('disconnected', () => {
    console.log('Mongoose Disconnected');
})

process.on('SIGINT', () => {
    connection.close(() => {
        console.log('Mongoose connection closed on Application Timeout');
        process.exit(0);
    })
})
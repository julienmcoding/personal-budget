const { connect, connection } = require('mongoose');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

connection.on('error', (error) => {
    console.error(error.message);
});

connection.on('disconnected', () => {
    console.log('Mongoose Disconnected');
});

process.on('SIGINT', () => {
    connection.close(() => {
        console.log('Mongoose connection closed on Application Timeout');
        process.exit(0);
    });
});

const enveloppeSchema = new Schema ({
    id: {
        type: Number,
        unique: true
    },
    title: String,
    budget: Number
});

const Enveloppe = mongoose.model('Enveloppe', enveloppeSchema);

const createAndSaveEnveloppe = (done) => {
  let julien = new Enveloppe({id: 5, title: 'Gifts', budget: 200});
  julien.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
const mongoose = require("mongoose");

class Database {
     _connection;
    constructor() {
        const uri = process.env.MONGO_URI;
        console.log(uri)
        mongoose.connect(uri).then(() => {
            console.log('connect to db');
        });
    }

    static getInstance() {
        return this._connection || (this._connection = new this()); 
    }
}
 
module.exports = Database;
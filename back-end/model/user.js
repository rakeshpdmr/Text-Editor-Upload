var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: String,
        default: ''
    },
    time: {
      type: String,
      default: "",
    },
});
        
var user = new mongoose.model('User', schema);

module.exports = user;
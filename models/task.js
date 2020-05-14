const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {
        type: String,
        required: true  //указывает, что поле title обязательно
    },
});

module.exports = model('task', schema);
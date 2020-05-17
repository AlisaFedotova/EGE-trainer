const {Schema, model} = require('mongoose');

const Task24Schema = new Schema({
    title: {
        type: String,
        validate: {
            validator: function (text) {
                return text.indexOf('https://twitter.com/') === 0;
            },
            message: 'Twitter handle must start with https://twitter.com/'
        }
    },
    text: String,
    code: {
        required: true,
        codeRow: [String]
    },
    innerTask: String,
    answers: {
        innerTaskAnswer1: String,
        innerTaskAnswer2: String,
        innerTaskAnswer3: {
            a: [String],
            b: [String]
        }
    },
    created: {
        type: Date,
        default: new Date
    }
});


module.exports = model('task', Task24Schema);
const {Schema, model} = require('mongoose');

const task24 = new Schema({
    title: {
        type: String,
        // validate: {
        //     validator: function (text) {
        //         return 0;
        //     }
        // }
    },
    taskText: String,
    code: {
        codeRow: String
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
    },
    completed: {
        type: Boolean,
        default: false
    }
});


module.exports = model('task', task24);
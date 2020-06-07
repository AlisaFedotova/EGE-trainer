const {Schema, model} = require('mongoose');

const task24 = new Schema({
    title: {
        type: Number,
        // validate: {
        //     validator: function (text) {
        //         return 0;
        //     }
        // }
    },
    taskType: Number,
    taskText: String,
    code: {
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
    },
    completed: {
        type: Boolean,
        default: false
    }
});


module.exports = model('task', task24);
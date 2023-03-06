const mongoose = require('mongoose')

const questionnaires = mongoose.Schema({
    questionnaireID: String,
    questionnaireTitle: String,
    keywords: [String],
    questions: [{
        __v: false,
        _id: false,
        qID: String,
        qtext: String,
        required: String,
        istype: String,
        options: [{
            __v: false,
            _id: false,
            optID: String,
            opttxt: String,
            nextqID: String       
        }]
    }]
})

module.exports = mongoose.model('questionnaires', questionnaires)
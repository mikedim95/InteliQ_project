const mongoose = require('mongoose')

const answers = mongoose.Schema({
    questionnaireID: String,
    qID: String,
    ans: String,
    session: String
})

module.exports = mongoose.model('answers', answers)
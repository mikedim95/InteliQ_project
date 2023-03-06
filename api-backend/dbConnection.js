const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://user_4:124578@cluster0.ywll0gb.mongodb.net/intelliQ?retryWrites=true&w=majority'
    );
    console.log("Connected To Database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

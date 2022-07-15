const mongoose = require('mongoose')

const mongoPath = "mongodb+srv://esdras:esdras@cluster0.zlofo.mongodb.net/querido-diario?retryWrites=true&w=majority"

module.exports = async () => {
    
    await mongoose.connect(mongoPath, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  return mongoose;
}
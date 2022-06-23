const mongoose = require('mongoose');

const connection_url=`mongodb+srv://admin:Salik9661874451@cluster0.y6j3n.mongodb.net/iNotebook`

const connectToMongo = ()=>{

    // mongoose.connect(mongoURI, ()=>{
    //     console.log("Connected to Mongo Successfully");
    // })

    mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    
    
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));
}

module.exports = connectToMongo;
import mongoose from 'mongoose';

export const connection = async (req, res) => {

  const db = await mongoose.connect(
    "mongodb+srv://ehirim87:gf9VzD4uvaidG1k7@fullstack-cluster.oo0m488.mongodb.net/"
  ).then(()=>console.log('connected to db'))
  .catch( (err)=> {
    console.log('error connecting')
})
}

//gf9VzD4uvaidG1k7
//"mongodb+srv://ehirim87:gf9VzD4uvaidG1k7@fullstack-cluster.oo0m488.mongodb.net/"
//const mongodbURL = "mongodb+srv://ehirim87:jM1G43qCn49mhzPd@pets-application.fv9exjj.mongodb.net/cool-pets?retryWrites=true&w=majority"
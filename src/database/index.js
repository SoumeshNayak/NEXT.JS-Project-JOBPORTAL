import mongoose from "mongoose"

const connectToDb=async()=>{
    const connectionURL="mongodb+srv://soum:soum@cluster0.jv0uz.mongodb.net/"

    mongoose.connect(connectionURL).then(()=>console.log("Connection success")
    ).catch(e=>console.log(e)
    )
}
export default connectToDb;
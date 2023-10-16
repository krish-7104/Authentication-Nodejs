import mongoose from "mongoose"

export const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDB Connected")
        }).catch((err) => {
            console.log("Error Database Connection: ", err)
        })
}

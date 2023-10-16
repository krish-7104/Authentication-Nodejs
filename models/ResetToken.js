import mongoose from "mongoose";

const ResetToken = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    expiredTime: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export default mongoose.model("Reset Token", ResetToken)
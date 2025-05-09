const { default: mongoose, mongo } = require("mongoose");



const userSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password : {
            type : String,
            required : true,
        },
        isLoggedIn : {
            type : Boolean,
            required : true,
            default : false
            
        }
    }
)

const User = mongoose.model("User",userSchema)
module.exports = { User };
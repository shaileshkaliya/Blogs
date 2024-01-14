const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        name : {
            type : String,
            required : true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
            required: [true, "Email required"]
        },
        password : {
            type : String,
            required : true,
            minlength:6
        }
    }
)

module.exports = mongoose.model("User", userSchema);
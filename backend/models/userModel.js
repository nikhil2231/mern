import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//creating mongooose schema for users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        validate: {
            validator: function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
            },
            message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timeStamp: true
});
    

// We need to compare the password coming from the user with encrypted password 
userSchema.methods.matchPass = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password)
}

// making a middleware for userModel to not store plain passwords 

userSchema.pre('save', async function(next) {
     if(!this.isModified("password") ) {
        next();
     } 
 const salt = await bcrypt.genSalt(12);

 this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);


export default User;
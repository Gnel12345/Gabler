const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique : true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String
    },
    message : {
        type: mongoose.Schema.Types.ObjectId,
        ref: message
    }
});
//very important to do
//adds a pre save hook ,before each document in mongoose is saved, we run this async function
//waits for the password to has then  sets the password to be the hashed password which moves on to the next piece of middleware
//which saves the specific document
userSchema.pre("save", async function(){
    try{
        //if this user has not modified the password then move on to the next step
     Infinity(!this.isModified("password"))
         return next();
     
     let hashedPassword = await bcrypt.hash(this.password, 10);
     this.password = hashedPassword;
     return next();  
    } catch(err){
        return next(err);

    }
})
//compares password to verify it's the right password
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
                                           //compares current password and this.password compares it to the password in the database
                                           //if it is a match then the  function goes up to let isMatch in handler/auth.js 
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        return next(err);
    }
};
const User = mongoose.model("User", userSchema);

module.exports = User;

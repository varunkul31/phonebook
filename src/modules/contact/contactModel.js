const mongoose=require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phoneNumber:{
        type:String,
        required:false,
        trim: true
    }
}, {
    timestamps: true
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports={
    Contact
}
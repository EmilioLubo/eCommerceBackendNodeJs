import { Schema, model } from 'mongoose';

const collection = "users";

const userSchema = new Schema({
    first_name : { 
        type : String,
        required : true 
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    birth : {
        type : Date,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cartId : {
        type:[
            {
                type:mongoose.SchemaTypes.ObjectId,
                ref:'carts'
            }
        ],
        default:[]
    },
    role : {
        type : String,
        enum : ['Admin', 'User'],
        default : 'User'
    }
})

const userModel = model(collection,userSchema);

export default userModel;
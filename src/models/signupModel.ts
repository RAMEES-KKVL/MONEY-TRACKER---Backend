import * as mongoose from 'mongoose'

const signupSchema = new mongoose.Schema<SignupRegistration>(
    {
        fullName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            unique : true,
            required : true
        },
        phone : {
            type : Number,
            required : true
        },
        password : {
            type : String,
            required : true
        },
    }, 
    {
        timestamps : true
    }
)

interface SignupRegistration {
    fullName : string,
    email : string,
    phone : number, 
    password : string
}

export const signupData = mongoose.model<SignupRegistration>('signup-datas', signupSchema)

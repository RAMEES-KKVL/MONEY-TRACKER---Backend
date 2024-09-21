import * as mongoose from "mongoose"

const transactionSchema = new mongoose.Schema<TransactionModel>(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        incomeTransaction : [],
        expenseTransaction : []
    },
    {
        timestamps : true
    }
)

interface TransactionModel {
    userId : mongoose.Schema.Types.ObjectId,
    incomeTransaction : [
        {
            transactionType : string,
            transactionCategory : string,
            transactionAmount : number,
            transactionDescription : string,
            transactionDate : Date
        }
    ],
    expenseTransaction : [
        {
            transactionType : string,
            transactionCategory : string,
            transactionAmount : number,
            transactionDescription : string,
            transactionDate : Date
        }
    ]
}
export const transactionModel = mongoose.model("transactions", transactionSchema)
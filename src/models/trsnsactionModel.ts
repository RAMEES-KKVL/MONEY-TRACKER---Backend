import * as mongoose from "mongoose"

const transactionSchema = new mongoose.Schema<TransactionModel>(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true
        },
        incomeTransaction : Array<Transaction>,
        expenseTransaction : Array<Transaction>
    },
    {
        timestamps : true
    }
)

interface TransactionModel {
    userId : mongoose.Schema.Types.ObjectId,
    incomeTransaction : Array<Transaction>,
    expenseTransaction : Array<Transaction>
}

interface Transaction {
    _id: mongoose.Schema.Types.ObjectId;
    transactionType: string;
    transactionCategory: string;
    transactionAmount: number;
    transactionDescription: string;
    transactionDate: Date;
}

export const transactionModel = mongoose.model("transactions", transactionSchema)
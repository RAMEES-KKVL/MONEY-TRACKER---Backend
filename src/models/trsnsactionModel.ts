import * as mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({})

export const transactionModel = mongoose.model("transactions", transactionSchema)
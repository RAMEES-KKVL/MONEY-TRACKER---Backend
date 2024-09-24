import express from "express"
import userController from "../controller/userController"
const Router = express.Router()

Router.post("/add_transaction", userController.addTransaction)

Router.get("/income", userController.getIncomeTransactions)

export default Router
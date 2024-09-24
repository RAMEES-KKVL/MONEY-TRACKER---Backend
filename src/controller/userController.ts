import { Request, Response } from "express" 
import { transactionModel } from "../models/trsnsactionModel"
import verifyToken from "../middleware/jwt.verification"

export default {
    addTransaction: async (req: Request, res: Response) => {
        const { 
            transactionType,
            transactionAmount,
            transactionCategory,
            transactionDescription,
            transactionDate,
        } = req.body
        const token = req.headers["authorization"]
        
        if ( !transactionType || !transactionAmount || !transactionCategory || !transactionDescription || !transactionDate ) {
            return res.status(400).json({ success : false, message : "Please provide required datas" })
        } else {
            if (!token) {
                return res.status(400).json({ success : false, message : "something went wrong, please log-in again" })
            } else {
                const decoded = verifyToken(token)                
                
                if ( !decoded.success ) {
                    return res.status(404).json({ success : false, tokenExpired : true, message : decoded.result })
                } else {
                    try {
                        const userId = decoded.result
                        const historyExist = await transactionModel.findOne({ userId })
                        
                        if (historyExist) {
                            if ( transactionType === "income" ) {
                                const updated = await transactionModel.findOneAndUpdate(
                                    { userId },
                                    {
                                        $push : {
                                            incomeTransaction : {
                                                transactionType,
                                                transactionCategory,
                                                transactionAmount,
                                                transactionDescription,
                                                transactionDate
                                            }
                                        }
                                    }
                                )
    
                                if ( updated ) {
                                    return res.status(200).json({ success : true })
                                } else {
                                    return res.status(400).json({ success : false, message : "Failed creating transaction" })
                                }
                            } else if ( transactionType === "expense" ) {
                                const updated = await transactionModel.findOneAndUpdate(
                                    { userId },
                                    {
                                        $push : {
                                            expenseTransaction : {
                                                transactionType,
                                                transactionCategory,
                                                transactionAmount,
                                                transactionDescription,
                                                transactionDate
                                            }
                                        }
                                    }
                                )
    
                                if ( updated ) {
                                    return res.status(200).json({ success : true })
                                } else {
                                    return res.status(500).json({ success : false, message : "Failed creating transaction" })
                                }
                            }
    
                        } else {
                            if ( transactionType === "income" ) {
                                const newSchema = new transactionModel({
                                    userId,
                                    incomeTransaction : [
                                        {
                                            transactionType,
                                            transactionCategory,
                                            transactionAmount,
                                            transactionDescription,
                                            transactionDate
                                        }
                                    ],
                                    expenseTransaction : []
                                })
    
                                const created = await newSchema.save()
                                if ( created ) {
                                    return res.status(200).json({ success : true })
                                } else {
                                    return res.status(500).json({ success : false, message : "Failed creating transaction" })
                                }
                            } else if ( transactionType === "expense" ) {
                                const newSchema = new transactionModel({
                                    userId,
                                    incomeTransaction : [],
                                    expenseTransaction: [
                                        {
                                            transactionType,
                                            transactionCategory,
                                            transactionAmount,
                                            transactionDescription,
                                            transactionDate
                                        }
                                    ]
                                })
    
                                const created = await newSchema.save()
                                if ( created ) {
                                    return res.status(200).json({ success : true })
                                } else {
                                    return res.status(500).json({ success : false, message : "Failed creating transaction" })
                                }
                            }
                        }  
                    } catch (error) {
                        // catching the error
                        return res.status(400).json({ success : false, message: 'Server error' })
                    }
                }
            }
        }
    },

    getIncomeTransactions: async (req: Request, res: Response) => {
        try {
            const token = req.headers["authorization"]

            if (!token) {
                return res.status(400).json({ success : false, message : "something went wrong, please log-in again" })
            } else {
                const decoded = verifyToken(token)

                if ( !decoded.success ) {
                    return res.status(404).json({ success : false, tokenExpired : true, message : decoded.result })
                } else {
                    const userId = decoded.result
                    const transactions = await transactionModel.findOne({ userId })
                    if ( !transactions ) {
                        return res.status(200).json({ success : true, emptyData : false })
                    } else {
                        const incomeTransactions = transactions.incomeTransaction.filter(( transaction )=> {
                            return transaction.transactionType === "income"
                        })
                        return res.status(200).json({ success : true, data : incomeTransactions })
                    }
                }
            }
        } catch (error) {
            return res.status(400).json({ success : false, message: 'Server error' })
        }
    }
}






// const decodedId = jwt.verify(token as string, process.env.JWT_SECRET as string, function (error, decode: any) {
//     if(decode) {
//         console.log(decode?.user)
//     } 
// }) 
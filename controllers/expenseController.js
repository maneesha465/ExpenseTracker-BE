
import xlsx from "xlsx";

import { Expense } from "../models/Expense.js";




//Add expense source
export const addExpense = async (req,res) =>{
const userId = req.user.id;

try {
    const {icon, category, amount, date} =req.body;

    //validation check for missing fields
    if(!category || !amount || !date) {
        return res.status(400).json({message:"All feilds are required"})
    }

    const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date: date ? new Date(date) : new Date()

    })

    await newExpense.save()
    res.status(200).json({newExpense})
} catch (error) {
   res.status(500).json({message:"Server error"})  
}

}

export const getAllExpense = async (req,res) =>{
const userId = req.user.id;
try {
    const expense = await Expense.find({userId}).sort({date: -1})
    res.json(expense)
} catch (error) {
   res.status(500).json({message:"Server error"}) 
}

}

export const downloadExpenseExcel = async (req,res) =>{
const userId = req.user.id;
try {
    const expense = await Expense.find({userId}).sort({date: -1})

    //prepare data for Excel
    const data = expense.map((item) =>({
      Category: item.category,
        Amount: item.amount,
        Date: item.date,
    }))

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, "expense")
    xlsx.writeFile(wb,'expense_details.xlsx')
    res.download('expense_details.xlsx')
    
} catch (error) {
    res.status(500).json({message:"Server error"})
}

}

export const deleteExpense = async (req,res) =>{
//const userId = req.user.id;
try {
   await Expense.findByIdAndDelete(req.params.id)
   res.json({message:"Expense deleted successfully"}) 
} catch (error) {
    res.status(500).json({message:"Server error"})
}

}


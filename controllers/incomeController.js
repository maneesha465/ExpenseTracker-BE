
import { Income } from "../models/Income.js";
import xlsx from "xlsx";


import{ User} from "../models/User.js";




//Add income source
export const addIncome = async (req,res) =>{
const userId = req.user.id;

try {
    const {icon, source, amount, date} =req.body;

    //validation check for missing fields
    if(!source || !amount || !date) {
        return res.status(400).json({message:"All feilds are required"})
    }

    const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date:new Date(date)
    })

    await newIncome.save()
    res.status(200).json({newIncome})
} catch (error) {
   res.status(500).json({message:"Server error"})  
}

}

export const getAllIncome = async (req,res) =>{
const userId = req.user.id;
try {
    const income = await Income.find({userId}).sort({date: -1})
    res.json(income)
} catch (error) {
   res.status(500).json({message:"Server error"}) 
}

}

export const downloadIncomeExcel = async (req,res) =>{
const userId = req.user.id;
try {
    const income = await Income.find({userId}).sort({date: -1})

    //prepare data for Excel
    const data = income.map((item) =>({
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
    }))

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb, ws, "Income")
    xlsx.writeFile(wb,'income_details.xlsx')
    res.download('income_details.xlsx')
    
} catch (error) {
    res.status(500).json({message:"Server error"})
}

}

export const deleteIncome = async (req,res) =>{
//const userId = req.user.id;
try {
   await Income.findByIdAndDelete(req.params.id)
   res.json({message:"Income deleted successfully"}) 
} catch (error) {
    res.status(500).json({message:"Server error"})
}

}


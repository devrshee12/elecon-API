const { default: mongoose, trusted } = require("mongoose");
const AssetBill = require("../models/AssetBill");


const dateInPast = (firstDate, secondDate) => {
    if(firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)){
        return true
    }
    else{
        return false
    }
}


const createAssetBill = async(req, res) => {
    try{    

        const {company, division, department, item, vendor, issued_to, approved_by} = req.body;
        const {issue_date, purchase_date, condition, sale_date, wdv_amount, sale_value, cjo_no} = req.body;
        const {payment_mode, payment_from_bank, cheque_date, cheque_no, cheque_to, transaction_date, transaction_no, transaction_status, payment_to_bank, amount} = req.body; 
        const assetBill = await AssetBill.create({company, division, department, item, vendor, issued_to, approved_by, issue_date: new Date(issue_date), purchase_date: new Date(purchase_date), condition, sale_date: new Date(sale_date), wdv_amount, sale_value, cjo_no, payment_mode, payment_from_bank, cheque_date: new Date(cheque_date), cheque_no, cheque_to, transaction_date: new Date(transaction_date), transaction_no, transaction_status, payment_to_bank, amount, created_by:"admin", created_date: Date.now(), updated_by: "admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"asset bill has been created", data: assetBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getAssetBills = async(req, res) => {
    try{
        const assetBills = await AssetBill.find({});
        return res.status(200).json({valid: true, msg:"hotel bill has been fetched", data: assetBills, count: assetBills.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificAssetBill = async(req, res) => {
    try{
        const ab_id = req.params.ab_id;
        const assetBill = await AssetBill.findOne({_id: ab_id}).populate("company", "company_name").populate("division", "division_name").populate("department", "department_name").populate("item", "asset_name").populate("vendor", "name").populate("issued_to", "emp_name").populate("approved_by", "emp_name")
        return res.status(200).json({valid: true, msg:"specific asset bill has been fetched", data: assetBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editAssetBill = async(req, res) => {
    try{
        const ab_id = req.params.ab_id;
        const {company, division, department, item, vendor, issued_to, approved_by} = req.body;
        const {issue_date, purchase_date, condition, sale_date, wdv_amount, sale_value, cjo_no} = req.body;
        const {payment_mode, payment_from_bank, cheque_date, cheque_no, cheque_to, transaction_date, transaction_no, transaction_status, payment_to_bank, amount} = req.body; 
        const assetBill = await AssetBill.findOne({_id: ab_id});
        assetBill.company = company
        assetBill.division = division
        assetBill.department = department
        assetBill.item = item
        assetBill.vendor = vendor
        assetBill.issued_to = issued_to
        assetBill.approved_by = approved_by

        assetBill.issue_date = new Date(issue_date)
        assetBill.purchase_date = new Date(purchase_date)
        assetBill.condition = condition
        assetBill.sale_date = new Date(sale_date)
        assetBill.wdv_amount = wdv_amount
        assetBill.sale_value = sale_value
        assetBill.cjo_no = cjo_no

        assetBill.payment_mode = payment_mode
        assetBill.payment_from_bank = payment_from_bank
        assetBill.cheque_date = new Date(cheque_date)
        assetBill.cheque_no = cheque_no
        assetBill.cheque_to = cheque_to
        assetBill.transaction_date = new Date(transaction_date)
        assetBill.transaction_no = transaction_no
        assetBill.transaction_status = transaction_status
        assetBill.payment_to_bank = payment_to_bank
        assetBill.amount = amount


        assetBill.updated_date = Date.now();

        await assetBill.save();
        return res.status(200).json({valid: true, msg:"asset bill has been updated", data:assetBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteAssetBill = async(req, res) => {
    try{
        const ab_id = req.params.ab_id;
        await AssetBill.findOneAndDelete({_id: ab_id});
        return res.status(200).json({valid: true, msg:"asset bill has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createAssetBill,
    getAssetBills,
    editAssetBill,
    getSpecificAssetBill,
    deleteAssetBill
}
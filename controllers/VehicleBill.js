const { default: mongoose, trusted } = require("mongoose");
const vehicleBill = require("../models/vehicleBill");
const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const dateInPast = (firstDate, secondDate) => {
    if(firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)){
        return true
    }
    else{
        return false
    }
}


const createVehicleBill = async(req, res) => {
    try{    

        const {company, division, department, vehicle_type, make_model, employee, approved_by, driver} = req.body;
        const {vehicle_no, purchase_date, issue_date, received_date, engine_no, chassis_no, remarks, usage} = req.body;
        const {sale_date, sale_value, wdv_amount, sale_to, supplier} = req.body;
        const {payment_mode, payment_from_bank, cheque_date, cheque_no, cheque_to, transaction_date, transaction_no, transaction_status, payment_to_bank, amount} = req.body; 
        const {rc_book_details, insurance_details, puc_details} = req.files;
        
        const rc_book = await cloudinary.uploader.upload(rc_book_details.tempFilePath)
        const insurance = await cloudinary.uploader.upload(insurance_details.tempFilePath)
        const puc = await cloudinary.uploader.upload(puc_details.tempFilePath)
        
        const vBill = await vehicleBill.create({
            company,
            division,
            department,
            vehicle_type,
            make_model,
            employee,
            approved_by,
            driver,
            vehicle_no,
            purchase_date: new Date(purchase_date),
            issue_date: new Date(issue_date),
            received_date: new Date(received_date),
            engine_no,
            chassis_no,
            remarks,
            usage,
            sale_date: new Date(sale_date),
            sale_value,
            wdv_amount,
            sale_to,
            supplier,
            payment_mode,
            payment_from_bank,
            cheque_date: new Date(cheque_date),
            cheque_no,
            cheque_to,
            transaction_date: new Date(transaction_date),
            transaction_no,
            transaction_status,
            payment_to_bank,
            amount,
            rc_book_details: rc_book.url,
            insurance_details: insurance.url,
            puc_details: puc.url,
            created_by: "admin",
            created_date: Date.now(),
            updated_by: "admin",
            updated_date: Date.now()

        })

        return res.status(200).json({valid: true, msg:"Vehicle bill has been created", data:vBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong", error: err});
    }
}

const getVehicleBills = async(req, res) => {
    try{
        const vBills = await vehicleBill.find({});
        return res.status(200).json({valid: true, msg:"vehicle bill has been fetched", data: vBills, count: vBills.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificVehicleBill = async(req, res) => {
    try{
        const vb_id = req.params.vb_id;
        const vBill = await vehicleBill.findOne({_id: vb_id}).populate("company", "company_name").populate("division", "division_name").populate("department", "department_name").populate("employee", "emp_name").populate("approved_by", "emp_name").populate("make_model", "make_and_model_name");
        return res.status(200).json({valid: true, msg:"specific vehicle bill has been fetched", data: vBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editVehicleBill = async(req, res) => {
    try{
        const vb_id = req.params.vb_id;
        const {company, division, department, vehicle_type, make_model, employee, approved_by, driver} = req.body;
        const {vehicle_no, purchase_date, issue_date, received_date, engine_no, chassis_no, remarks, usage} = req.body;
        const {sale_date, sale_value, wdv_amount, sale_to, supplier} = req.body;
        const {payment_mode, payment_from_bank, cheque_date, cheque_no, cheque_to, transaction_date, transaction_no, transaction_status, payment_to_bank, amount} = req.body; 
        const {rc_book_details, insurance_details, puc_details} = req.files;
        
        const rc_book = await cloudinary.uploader.upload(rc_book_details.tempFilePath)
        const insurance = await cloudinary.uploader.upload(insurance_details.tempFilePath)
        const puc = await cloudinary.uploader.upload(puc_details.tempFilePath)

        const vBill = await makeAndModelBill.findOne({_id: vb_id});
        vBill.company = company
        vBill.division = division
        vBill.department = department
        vBill.vehicle_type = vehicle_type
        vBill.make_model = make_model
        vBill.employee = employee
        vBill.approved_by = approved_by
        vBill.driver = driver

        vBill.vehicle_no = vehicle_no
        vBill.purchase_date = new Date(purchase_date)
        vBill.issue_date = new Date(issue_date)
        vBill.received_date = new Date(received_date)
        vBill.engine_no = engine_no
        vBill.chassis_no = chassis_no
        vBill.remarks = remarks
        vBill.usage = usage


        vBill.sale_date = new Date(sale_date)
        vBill.sale_value = sale_value
        vBill.wdv_amount = wdv_amount
        vBill.sale_to = sale_to
        vBill.supplier = supplier


        vBill.payment_mode = payment_mode
        vBill.payment_from_bank = payment_from_bank
        vBill.cheque_date = new Date(cheque_date)
        vBill.cheque_no = cheque_no
        vBill.cheque_to = cheque_to
        vBill.transaction_date = new Date(transaction_date)
        vBill.transaction_no = transaction_no
        vBill.transaction_status = transaction_status
        vBill.payment_to_bank = payment_to_bank
        vBill.amount = amount


        vBill.rc_book_details = rc_book.url
        vBill.insurance_details = insurance.url
        vBill.puc_details = puc.url

        vBill.updated_date = Date.now();

        await vBill.save();
        return res.status(200).json({valid: true, msg:"vehicle bill has been updated", data:vBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteVehicleBill = async(req, res) => {
    try{
        const vb_id = req.params.vb_id;
        await vehicleBill.findOneAndDelete({_id: vb_id});
        return res.status(200).json({valid: true, msg:"vehicle bill has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createVehicleBill,
    getVehicleBills,
    editVehicleBill,
    getSpecificVehicleBill,
    deleteVehicleBill
}
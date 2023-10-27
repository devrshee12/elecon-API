const { default: mongoose, trusted } = require("mongoose");
const HotelBill = require("../models/HotelBill");


const dateInPast = (firstDate, secondDate) => {
    if(firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)){
        return true
    }
    else{
        return false
    }
}


const createHotelBill = async(req, res) => {
    try{    

        const {company, division, department, booked_by, hotel} = req.body;
        const {guest_name, requisition_date, stay_to_date, stay_from_date} = req.body;
        const {bill_no, total_days, amount, billing_date} = req.body; 

        if(dateInPast(new Date(stay_to_date), new Date()) || dateInPast(new Date(stay_from_date), new Date()) || (new Date(stay_from_date) > new Date(stay_to_date))){
            return res.status(500).json({valid: false, msg:"check your dates"});
        }

        const hotelBill = await HotelBill.create({company, division, department, booked_by, hotel, guest_name, requisition_date, stay_from_date: new Date(stay_from_date), stay_to_date: new Date(stay_to_date), bill_no, total_days, amount, billing_date: new Date(billing_date), created_by:"admin", created_date: Date.now(), updated_by: "admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"hotel bill has been created", data: hotelBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getHotelBills = async(req, res) => {
    try{
        const hotelBills = await HotelBill.find({});
        return res.status(200).json({valid: true, msg:"hotel bill has been fetched", data: hotelBills, count: hotelBills.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificHotelBill = async(req, res) => {
    try{
        const hb_id = req.params.hb_id;
        const hotelBill = await HotelBill.findOne({_id: hb_id}).populate("company", "company_name").populate("division", "division_name").populate("department", "department_name").populate("booked_by", "emp_name").populate("hotel", "name");
        return res.status(200).json({valid: true, msg:"specific hotel bill has been fetched", data: hotelBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editHotelBill = async(req, res) => {
    try{
        const hb_id = req.params.hb_id;
        const {company, division, department, booked_by, hotel} = req.body;
        const {guest_name, requisition_date, stay_to_date, stay_from_date} = req.body;
        const {bill_no, total_days, amount, billing_date} = req.body; 
        const hotelBill = await HotelBill.findOne({_id: hb_id});
        hotelBill.company = company
        hotelBill.division = division
        hotelBill.department = department
        hotelBill.booked_by = booked_by
        hotelBill.hotel = hotel

        hotelBill.guest_name = guest_name
        hotelBill.requisition_date = new Date(requisition_date)
        hotelBill.stay_to_date = new Date(stay_to_date)
        hotelBill.stay_from_date = new Date(stay_from_date)

        hotelBill.bill_no = bill_no
        hotelBill.total_days = total_days
        hotelBill.amount = amount
        hotelBill.billing_date = new Date(billing_date)


        hotelBill.updated_date = Date.now();

        await hotelBill.save();
        return res.status(200).json({valid: true, msg:"hotel bill has been updated", data:hotelBill});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteHotelBill = async(req, res) => {
    try{
        const hb_id = req.params.hb_id;
        await HotelBill.findOneAndDelete({_id: hb_id});
        return res.status(200).json({valid: true, msg:"hotel bill has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createHotelBill,
    getHotelBills,
    editHotelBill,
    getSpecificHotelBill,
    deleteHotelBill
}
const { default: mongoose } = require("mongoose");
const HotelMaster = require("../models/HotelMaster");






const createHotel = async(req, res) => {
    try{    
        const {name, phone_no, email_id, address1, address2, city, state, pincode, district} = req.body;
        const {company, division, department} = req.body;
        const hotel = await  HotelMaster.create({name, phone_no, email_id, address1, address2, city, state, pincode, district, company, division, department,created_by: "admin", created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"hotel has been created", data:hotel});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getHotels = async(req, res) => {
    try{
        const hotels = await HotelMaster.find({});
        return res.status(200).json({valid: true, msg:"hotels has been fetched", data:hotels, count: hotels.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificHotel = async(req, res) => {
    try{
        const h_id = req.params.h_id;
        const hotel = await HotelMaster.findOne({_id: h_id});
        return res.status(200).json({valid: true, msg:"hotel has been fetched", data:hotel});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editHotel = async(req, res) => {
    try{
        const h_id = req.params.h_id;

        const {name, phone_no, email_id, address1, address2, city, state, pincode, district} = req.body;
        const {company, division, department} = req.body;
        const hotel = await HotelMaster.findOne({_id: h_id});
        hotel.name = name 
        hotel.phone_no = phone_no 
        hotel.email_id = email_id 
        hotel.address1 = address1 
        hotel.address2 = address2 
        hotel.city = city 
        hotel.state = state 
        hotel.pincode = pincode 
        hotel.district = district 
        hotel.company = company 
        hotel.division = division 
        hotel.department = department 
        hotel.updated_date = Date.now();
        await hotel.save();
        return res.status(200).json({valid: true, msg:"hotel has been updated", data:hotel});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteHotel = async(req, res) => {
    try{
        const h_id = req.params.h_id;
        await HotelMaster.findByIdAndDelete({_id: h_id});
        return res.status(200).json({valid: true, msg:"hotel has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createHotel,
    getHotels,
    getSpecificHotel,
    editHotel,
    deleteHotel

}
const { default: mongoose } = require("mongoose");
const VendorMaster = require("../models/VendorMaster");





const createVendor = async(req, res) => {
    try{    
        const {name, phone_no, email_id, address1, address2, city, state, pincode, vendor_code} = req.body;
        const vendor = await VendorMaster.create({name, phone_no, email_id, address1, address2, city, state, pincode, vendor_code, created_by: "admin", created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"vendor has been created", data:vendor});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getVendors = async(req, res) => {
    try{
        const vendors = await VendorMaster.find({});
        return res.status(200).json({valid: true, msg:"vendor has been fetched", data:vendors, count: vendors.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificVendor = async(req, res) => {
    try{
        const v_id = req.params.v_id;
        const vendor = await VendorMaster.findOne({_id: v_id});
        return res.status(200).json({valid: true, msg:"vendor has been fetched", data:vendor});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editVendor = async(req, res) => {
    try{
        const v_id = req.params.v_id;

        const {name, phone_no, email_id, address1, address2, city, state, pincode, vendor_code} = req.body;
        const vendor = await VendorMaster.findOne({_id: v_id});
        vendor.name = name 
        vendor.phone_no = phone_no 
        vendor.email_id = email_id 
        vendor.address1 = address1 
        vendor.address2 = address2 
        vendor.city = city 
        vendor.state = state 
        vendor.pincode = pincode 
        vendor.vendor_code = vendor_code 
        vendor.updated_date = Date.now();
        await vendor.save();
        return res.status(200).json({valid: true, msg:"vendor has been updated", data:vendor});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteVendor = async(req, res) => {
    try{
        const v_id = req.params.v_id;
        await VendorMaster.findByIdAndDelete({_id: v_id});
        return res.status(200).json({valid: true, msg:"vendor has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createVendor,
    getVendors,
    getSpecificVendor,
    editVendor,
    deleteVendor
}
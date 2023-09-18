const { default: mongoose } = require("mongoose");
const LocationMaster = require("../models/LocationMaster");







const createLocation = async(req, res) => {
    try{    
        const {location_name, company, division, department} = req.body;
        const location = await  LocationMaster.create({location_name, company, division, department, created_by: "admin", created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"location has been created", data:location});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getLocations = async(req, res) => {
    try{
        const locations = await LocationMaster.find({});
        return res.status(200).json({valid: true, msg:"locations has been fetched", data:locations, count: locations.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificLocation = async(req, res) => {
    try{
        const l_id = req.params.l_id;
        const location = await LocationMaster.findOne({_id: l_id});
        return res.status(200).json({valid: true, msg:"location has been fetched", data:location});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editLocation = async(req, res) => {
    try{
        const l_id = req.params.l_id;

        const {location_name, company, division, department} = req.body;
        
        const location = await LocationMaster.findOne({_id: l_id});
        location.name = location_name 
        location.company = company 
        location.division = division 
        location.department = department 
        location.updated_date = Date.now();
        await location.save();
        return res.status(200).json({valid: true, msg:"location has been updated", data:location});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteLocation = async(req, res) => {
    try{
        const l_id = req.params.l_id;
        await LocationMaster.findByIdAndDelete({_id: l_id});
        return res.status(200).json({valid: true, msg:"location has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createLocation,
    getLocations,
    getSpecificLocation,
    editLocation,
    deleteLocation

}
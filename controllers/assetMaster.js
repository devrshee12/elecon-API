const { default: mongoose } = require("mongoose");
const AssetMaster = require("../models/AssetMaster");







const createAsset = async(req, res) => {
    try{    
        const {asset_name, company, division, department} = req.body;
        const asset = await  AssetMaster.create({asset_name, created_by: "admin", company, division, department,created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"asset has been created", data:asset});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getAssets = async(req, res) => {
    try{
        const assets = await AssetMaster.find({});
        return res.status(200).json({valid: true, msg:"assets has been fetched", data:assets, count: assets.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificAsset = async(req, res) => {
    try{
        const a_id = req.params.a_id;
        const asset = await AssetMaster.findOne({_id: a_id});
        return res.status(200).json({valid: true, msg:"asset has been fetched", data:asset});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editAsset = async(req, res) => {
    try{
        const a_id = req.params.a_id;

        const {asset_name, company, division, department} = req.body;
        const asset = await AssetMaster.findOne({_id: a_id});
        asset.asset_name = asset_name 
        asset.company = company 
        asset.division = division 
        asset.department = department 
        asset.updated_date = Date.now();
        await asset.save();
        return res.status(200).json({valid: true, msg:"asset has been updated", data:asset});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteAsset = async(req, res) => {
    try{
        const a_id = req.params.a_id;
        await AssetMaster.findByIdAndDelete({_id: a_id});
        return res.status(200).json({valid: true, msg:"asset has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createAsset,
    getAssets,
    getSpecificAsset,
    editAsset,
    deleteAsset

}
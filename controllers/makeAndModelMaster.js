const { default: mongoose } = require("mongoose");
const MakeAndModelMaster = require("../models/MakeAndModelMaster");








const createMAndM = async(req, res) => {
    try{    
        const {make_and_model_name, company, division, department} = req.body;
        const m_m = await  MakeAndModelMaster.create({make_and_model_name, company, division, department, created_by: "admin", created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"make and model has been created", data:m_m});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getMAndMs = async(req, res) => {
    try{
        const m_ms = await MakeAndModelMaster.find({});
        return res.status(200).json({valid: true, msg:"make and models has been fetched", data:m_ms, count: m_ms.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificMAndM = async(req, res) => {
    try{
        const m_id = req.params.m_id;
        const m_m = await MakeAndModelMaster.findOne({_id: m_id});
        return res.status(200).json({valid: true, msg:"make and model has been fetched", data:m_m});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editMAndM = async(req, res) => {
    try{
        const m_id = req.params.m_id;

        const {make_and_model_name, company, division, department} = req.body;
        const m_m = await MakeAndModelMaster.findOne({_id: m_id});
        m_m.make_and_model_name = make_and_model_name 
        m_m.company = company 
        m_m.division = division 
        m_m.department = department 
        m_m.updated_date = Date.now();
        await m_m.save();
        return res.status(200).json({valid: true, msg:"make and model has been updated", data:m_m});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteMAndM = async(req, res) => {
    try{
        const m_id = req.params.m_id;
        await MakeAndModelMaster.findByIdAndDelete({_id: m_id});
        return res.status(200).json({valid: true, msg:"make and model has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createMAndM,
    getMAndMs,
    getSpecificMAndM,
    editMAndM,
    deleteMAndM

}
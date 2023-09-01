const Accessories = require("../models/Accessories");
const Employee = require("../models/Employee");
const Visitor = require("../models/Visitor")



// this API is only used when employee will create the user 
const createVisitor = async(req, res) => {
    try{

        // const {acc_name, acc_type, model_no, is_returnable} = req.body;
        // const accessories = await Accessories.create({acc_name, acc_type, model_no, is_returnable})
        const {name, phone_no, email_id, gender, is_professional, guest_company, designation, id_proof, id_number, place, visit_type, purpose, entry_gate, appointment_half} = req.body;
        // insert created by and other fields
        const {emp_id, to_whom_id} = req.body; // actual emp_id --> _id

        // to_whom_id for created_by

        // console.log("here in backend id_proof", id_proof)


        // to_date and from date 
        var {to_date, from_date} = req.body; // format yyyy-mm-dd"
        const to_d = new Date(to_date)
        
        if(from_date === ""){
            from_date = to_date;
        }
        
        const from_d = new Date(from_date);
        
        const visitor = await Visitor.create({name, phone_no, email_id, gender, is_professional, designation, id_proof, id_number, place, visit_type, purpose, entry_gate, appointment_half, guest_company, created_date: new Date(), created_by: emp_id, updated_date: new Date(), updated_by: emp_id, to_date: to_d, from_date: from_d, to_whom_id});

        const emp = await Employee.findOne({_id:emp_id});
        emp.visitors.push(visitor._id);
        await emp.save()
        res.status(200).json({valid: true, msg:"visitor has been created", visitor, emp});
    }   
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


// this API will be used when gate user wants to add the accessoried for specific visitor
const addAccessories = async(req, res) => {
    try{
        const visitor_id = req.params.id;
        const {acc_name, acc_type, model_no, is_returnable} = req.body;

        console.log(visitor_id)
        const acc = await Accessories.create({acc_name, acc_type, model_no, is_returnable});
        

        const vis = await Visitor.findOne({_id: visitor_id});

        vis.accessories_id.push(acc._id);

        await vis.save();

        res.status(200).json({valid: true, msg:"Accessories has been updated", visitor: vis, accessories: acc});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const updateVisitor = async(req, res) => {
    try{
        const visitor_id = req.params.id;

        const {name, phone_no, email_id, gender, is_professional, guest_company, designation, id_proof, id_number, place, visit_type, purpose, entry_gate, appointment_half} = req.body;
        const {to_date, from_date } = req.body;
        const {emp_id, to_whom_id} = req.body;
        const to_d = ((to_date === "") ? "" : new Date(to_date))
        const from_d = ((from_date === "") ? "" : new Date(from_date))
        

        const vis = await Visitor.findOne({_id: visitor_id});
        vis.name = name;
        vis.phone_no = phone_no;
        vis.email_id = email_id;
        vis.gender = gender;
        vis.is_professional = is_professional;
        vis.designation = designation;
        vis.id_proof = id_proof;
        vis.id_number = id_number
        vis.guest_company = guest_company
        vis.place = place
        vis.visit_type = visit_type
        vis.purpose = purpose
        vis.entry_gate = entry_gate
        vis.appointment_half = appointment_half;
        if(to_d !== "")vis.to_date = to_d
        if(from_d !== "")vis.from_date = from_d
        // created_date: new Date(), created_by: to_whom_id, updated_date: new Date(), updated_by: to_whom_id, to_date: to_d, from_date: from_d, requisition_id
        vis.updated_date = new Date();
        vis.updated_by = emp_id
        vis.to_whom_id = to_whom_id
        await vis.save()

        res.status(200).json({valid: true, msg:"visitor has been updated", visitor: vis});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getAllVisitor = async(req, res) => {
    try{
        const visitors = await Visitor.find({});
        res.status(200).json({valid: true, msg:"data has been fetched", data:visitors, count: visitors.length});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getTodayVisitor = async(req, res) => {
    try{
        var start = new Date()
        start.setHours(0,0,0,0)
        var end = new Date()
        end.setHours(23, 59, 59, 999)

        const visitors = await Visitor.find({
            $and: [
                {to_date: {$gte: start}},
                {from_date: {$lte: end}}
            ]
        })
        res.status(200).json({valid: true, msg:"data has been fetched", data:visitors, count: visitors.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}






const getTodayVisitorForEmp = async(req, res) => {
    try{
        const emp_id = req.params.emp_id
        var start = new Date()
        start.setHours(0,0,0,0)
        var end = new Date()
        end.setHours(23, 59, 59, 999)

        const visitors = await Visitor.find({
            $and: [
                {to_whom_id: emp_id},
                {to_date: {$gte: start}},
                {from_date: {$lte: end}}
            ]
        })
        res.status(200).json({valid: true, msg:"data has been fetched", data:visitors, count: visitors.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getInTimeVisitorForEmp = async(req, res) => {
    try{
        const emp_id = req.params.emp_id
        var start = new Date()
        start.setHours(0,0,0,0)
        var end = new Date()
        end.setHours(23, 59, 59, 999)

        const visitors = await Visitor.find({
            $and: [
                {to_whom_id: emp_id},
                {to_date: {$gte: start}},
                {from_date: {$lte: end}}
            ]
        })

        // got all visitors for today
        const curr_datetime = new Date()
        const inVisitors = visitors.filter((visitor) => {
            if(visitor.in_time && !visitor.out_time){
                return curr_datetime > visitor.in_time
            }
        })

        res.status(200).json({valid: true, msg:"data has been fetched", data:inVisitors, count: inVisitors.length});


    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getOutTimeVisitorForEmp = async(req, res) => {
    try{
        const emp_id = req.params.emp_id
        var start = new Date()
        start.setHours(0,0,0,0)
        var end = new Date()
        end.setHours(23, 59, 59, 999)

        const visitors = await Visitor.find({
            $and: [
                {to_whom_id: emp_id},
                {to_date: {$gte: start}},
                {from_date: {$lte: end}}
            ]
        })

        // got all visitors for today
        const curr_datetime = new Date()
        const outVisitors = visitors.filter((visitor) => {
            if(visitor.in_time && visitor.out_time){
                return curr_datetime > visitor.out_time

            }
        })

        res.status(200).json({valid: true, msg:"data has been fetched", data:outVisitors, count: outVisitors.length});


    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getRemainingVisitorForEmp = async(req, res) => {
    try{
        const emp_id = req.params.emp_id
        var start = new Date()
        start.setHours(0,0,0,0)
        var end = new Date()
        end.setHours(23, 59, 59, 999)

        const visitors = await Visitor.find({
            $and: [
                {to_whom_id: emp_id},
                {to_date: {$gte: start}},
                {from_date: {$lte: end}}
            ]
        })

        // got all visitors for today
        // const curr_datetime = new Date()
        const reVisitors = visitors.filter((visitor) => {
            if(!visitor.in_time && !visitor.out_time){
                return true
            }
        })

        res.status(200).json({valid: true, msg:"data has been fetched", data:reVisitors, count: reVisitors.length});


    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const inTime = async(req, res) => {
    try{
        const vis_id = req.params.id
        const emp = await Visitor.findOne({_id: vis_id});
        emp.in_time = new Date()

        await emp.save()

        res.status(200).json({valid: true, msg: "visitor has arrived", emp})
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg: "something went wrong"});
    }
}

const outTime = async(req, res) => {
    try{
        const vis_id = req.params.id
        const emp = await Visitor.findOne({_id: vis_id});
        if(emp.in_time){
            emp.out_time = new Date()
            await emp.save()
            res.status(200).json({valid: true, msg: "visitor has departed", emp})

        }
        else{
            res.status(404).json({valid: false, msg: "visitor never arrived"});
        }


    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg: "something went wrong"});
    }
}


const getAccessories = async(req, res) => {
    try{
        const visitorId = req.params.id;
        const acc = await Visitor.findOne({_id: visitorId});
        console.log("here in backend get acc");
        const allAcc = await Accessories.find({_id: {
            $in: acc.accessories_id
        }})

        console.log("after op");
        res.status(200).json({valid: true, msg: "acc have been fetched", data:allAcc});
        console.log("afteasdsadasdas");

    }
    catch(err){
        console.log("here in err")
        console.log(err)
        res.status(500).json({valid: false, msg: "something went wrong"});
    }
}


const deleteVisitor = async(req, res) => {
    try{
        const visitor_id = req.params.id;
        const visitor = await Visitor.findByIdAndDelete({_id: visitor_id});
        res.status(200).json({valid: true, msg: "visitor has been deleted"});
    }
    catch(err){
        res.status(500).json({valid: false, msg: "something went wrong"});
    }
}


const getVisitor = async(req, res) => {
    try{    
        const id = req.params.id
        const visitor = await Visitor.findOne({_id:id});
        res.status(200).json({valid: true, msg: "got visitor", data:visitor});
        

    }
    catch(err){
        res.status(500).json({valid: false, msg: "something went wrong"});
    }
}






module.exports = {
    createVisitor,
    addAccessories,
    updateVisitor,
    getAllVisitor,
    getTodayVisitor,
    getTodayVisitorForEmp,
    getInTimeVisitorForEmp,
    getOutTimeVisitorForEmp,
    inTime,
    outTime,
    getRemainingVisitorForEmp,
    getAccessories,
    deleteVisitor,
    getVisitor,
}
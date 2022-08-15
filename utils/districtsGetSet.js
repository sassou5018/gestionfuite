import connectMongo from "./connectMongo";
import districts from "./dbModels/districts";

async function getDistrict(req){
    if (req.body.nom_district){
        try {
            connectMongo();
            const district = await districts.findOne({nom_district: req.body.nom_district}).populate('city');
            return district;
        } catch (err) {
            throw err;
        }
    } else if (req.body.code_district) {
        try {
            connectMongo();
            const district = await districts.findOne({code_district: req.body.code_district}).populate('city');
            return district;
        } catch (err) {
            throw err;
        }
    } else {
        try {
            connectMongo();
            const district = await districts.find().populate('city');
            return district;
        } catch (err) {
            throw err;
        }
    }
}

async function setDistrict(req){
    try {
        connectMongo();
        const district = await districts.create(req.body);
        return district;
    } catch (err) {
        throw err;
    }
}

async function deleteDistrict(req){
    if (req.body.nom_district) {
        try {
            connectMongo();
            const district = await districts.deleteOne({district_name: req.body.district_name});
            return district;
        } catch (err) {
            throw err;
        }
    } else if (req.body.code_district) {
        try {
            connectMongo();
            const district = await districts.deleteOne({code_district: req.body.code_district});
            return district;
        } catch (err) {
            throw err;
        }
    }
}

export {getDistrict, setDistrict, deleteDistrict};
import connectMongo from "./connectMongo";
import districts from "./dbModels/districts";

async function getDistrict(req){
    if (req.body.district_name){
        try {
            connectMongo();
            const district = await districts.findOne({district_name: req.body.district_name}).populate('city');
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
    try {
        connectMongo();
        const district = await districts.deleteOne({district_name: req.body.district_name});
        return district;
    } catch (err) {
        throw err;
    }
}

export {getDistrict, setDistrict, deleteDistrict};
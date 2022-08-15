import connectMongo from "./connectMongo";
import reclamations from "./dbModels/reclamations";


async function getReclamation(req){
    if (req.body.reclamation_id){
        try {
            connectMongo();
            const reclamation = await reclamations.findOne({reclamation_id: req.body.reclamation_id}).populate('city', 'district');
            return reclamation;
        } catch (err) {
            throw err;
        }
    } else {
        try {
            connectMongo();
            const reclamation = await reclamations.find().populate('city', 'district');
            return reclamation;
        } catch (err) {
            throw err;
        }
    }
}

async function setReclamation(req){
    try {
        connectMongo();
        const reclamation = await reclamations.create(req.body);
        return reclamation;
    } catch (err) {
        throw err;
    }
}

async function deleteReclamation(req){
    try {
        connectMongo();
        const reclamation = await reclamations.deleteOne({reclamation_id: req.body.reclamation_id});
        return reclamation;
    } catch (err) {
        throw err;
    }
}

export {getReclamation, setReclamation, deleteReclamation};
import reclamations from "../../utils/dbModels/reclamations";
import connectMongo from "../../utils/connectMongo";

export default async function getUserReclams (req, res) {
    if (req.method == 'POST'){
        try{
            await connectMongo();
            let reclams = await reclamations.find({'_id': {$in: req.body.reclamations}}).populate('city district');
            res.status(200).json({message:'Reclamations trouvées', reclams: reclams});
        } catch (err){
            res.status(500).json({error: err.message});
        }
    }
}
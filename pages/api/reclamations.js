import { getReclamation, setReclamation, deleteReclamation, updateReclamation } from "../../utils/reclamationsGetSet";


export default async function reclamationAPI(req, res) {
    try {
        let response = {};
        switch (req.method) {
            case 'GET':
                response = await getReclamation(req);
                if (response === null) {
                    res.status(404).send({ error: "No reclamation found" });
                    return;
                }
                break;
            case 'POST':
                response = await setReclamation(req);
                break;
            case 'PUT':
                response = await updateReclamation(req);
                break;
            case 'DELETE':
                response = await deleteReclamation(req);
                break;
            default:
                res.status(500).json({ error: err });
                return;
        }
        res.status(200).json({message: 'success', data: response});
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
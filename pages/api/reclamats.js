import { getReclamation, setReclamation, deleteReclamation } from "../../utils/reclamationsGetSet";


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
                response = { error: "Method not allowed" };
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).send(err);
    }
}
import { getDistrict, setDistrict, deleteDistrict, updateDistrict } from "../../utils/districtsGetSet";


export default async function districtAPI(req, res) {
    try {
        let response = {};
        switch (req.method) {
            case 'GET':
                response = await getDistrict(req);
                if (response === null) {
                    res.status(404).send({ error: "No district found" });
                    return;
                }
                break;
            case 'POST':
                response = await setDistrict(req);
                break;
            case 'DELETE':
                response = await deleteDistrict(req);
                break;
            case 'PUT':
                response = await updateDistrict(req);
                break;

            default:
                response = { error: "Method not allowed" };
        }
        //console.log(response);
        res.status(200).json({ message: 'Success', data: response });
    } catch (err) {
        res.status(500).send(err);
    }
}
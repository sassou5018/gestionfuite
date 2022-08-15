import { getDistrict, setDistrict, deleteDistrict } from "../../utils/districtsGetSet";


export default async function districtAPI(req, res) {
    try{
    let response = {};
  switch (req.method){
    case 'GET':
       response = await getDistrict(req);
       if (response === null){
        res.status(404).send({error: "No district found"});
        return;
        }
        break;
    case 'POST':
        response = await setDistrict(req);
        break;
    case 'DELETE':
        response = await deleteDistrict(req);
        break;

    default:
        response = { error: "Method not allowed" };
  }
    //console.log(response);
    res.status(200).json(response);
} catch (err) {
    res.status(500).send(err);
}
}
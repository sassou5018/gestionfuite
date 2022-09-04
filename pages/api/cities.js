import { getCity, setCity, deleteCity, editCity } from '../../utils/citiesGetSet';

export default async function cityAPI(req, res) {
    try{
    let response = {};
  switch (req.method){
    case 'GET':
       response = await getCity(req);
       if (response === null){
        response = {
            error: "No city found"
        }
        }
        break;
    case 'POST':
        response = await setCity(req);
        break;
    case 'DELETE':
        response = await deleteCity(req);
        break;
    case 'PUT':
        response = await editCity(req);
        break;
    default:
        response = { error: "Method not allowed" };
  }
    console.log(response);
    res.status(200).json({message: 'Success', data: response});
} catch (err) {
    res.status(500).send({error:'error',err: err});
}
}


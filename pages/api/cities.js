import { getCity, setCity, deleteCity } from '../../utils/citiesGetSet';

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
    default:
        response = { error: "Method not allowed" };
  }
    console.log(response);
    res.status(200).json(response);
} catch (err) {
    res.status(500).send(err);
}
}


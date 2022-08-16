import { getUser, setUser, pushRecUser, pullRecUser, deleteUser } from '../../utils/usersGetSet';

export default async function usersAPI(req, res){
    try{
        let response = {};
        switch (req.method){
            case 'GET':
                response = await getUser(req);
                if (response === null){
                    res.status(404).send({error: "No user found"});
                    return;
                }
                break;
            case 'POST':
                response = await setUser(req);
                break;
            case 'PUT':
                response = await updateUser(req);
                break;
            case 'DELETE':
                response = await deleteUser(req);
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
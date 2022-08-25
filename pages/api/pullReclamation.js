import { getReclamation, setReclamation, deleteReclamation } from "../../utils/reclamationsGetSet";
import { getUser, setUser, pushRecUser, pullRecUser, deleteUser } from '../../utils/usersGetSet';


export default async function addReclamation (req, res) {
    if (req.method == 'DELETE'){
        const result = await pullRecUser(req);
        if (result){
            console.log(req.body)
            res.end(JSON.stringify(result));
        } else {
            res.end(JSON.stringify({error: 'Error pulling reclamation from user'}));
        }
        }
        
    }

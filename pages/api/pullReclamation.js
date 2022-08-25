import { getReclamation, setReclamation, deleteReclamation } from "../../utils/reclamationsGetSet";
import { getUser, setUser, pushRecUser, pullRecUser, deleteUser } from '../../utils/usersGetSet';
import users from '../../utils/dbModels/users';
import connectMongo from "../../utils/connectMongo";


export default async function addReclamation (req, res) {
    if (req.method == 'DELETE'){
        try {
            connectMongo();
            console.log(req.body)
            const reqbody= JSON.parse(req.body);    
            console.log('reqbody',reqbody);
            const {email,reclamation_id} = reqbody;
            const user = await users.findOne({email: email});
            user.reclamations.pull({_id: reclamation_id});
            await user.save();
            console.log('user',user);
            res.status(200).json({message: 'Reclamation deleted'});
            
        } catch (err) {
            throw err;
            res.status(500).json({error: err});
        }
        }
        
    }

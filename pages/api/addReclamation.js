import { getReclamation, setReclamation, deleteReclamation } from "../../utils/reclamationsGetSet";
import { getUser, setUser, pushRecUser, pullRecUser, deleteUser } from '../../utils/usersGetSet';


export default async (req, res) => {
    if (req.method == 'post'){
        let user = await getUser(req);
        if (user){
            let reclamation = await setReclamation(req);
            await pushRecUser({ body: { email: user.email, reclamation_id: reclamation.reclamation_id } });
            res.status(200).json({
                message: "Reclamation Ajoutée",
                lienReclam: "/reclamations/" + reclamation.reclamation_id
            });
            return;
        } else if (user == null){
            let reclamation = await setReclamation(req);
            let newUser = await setUser(req);
            await pushRecUser({ body: { email: req.body.email, reclamation_id: reclamation.reclamation_id } });
            res.status(200).json({
                message: `Pas d'utilisateur trouvée avec cet addresse mail, nous avons créé un compte pour vous avec le mot de passe: ${newUser.pwd}`,
                lienReclam: "/reclamations/" + reclamation.reclamation_id
            })
        }
        
        
    }
}
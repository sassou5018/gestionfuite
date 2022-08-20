import { getReclamation, setReclamation, deleteReclamation } from "../../utils/reclamationsGetSet";
import { getUser, setUser, pushRecUser, pullRecUser, deleteUser } from '../../utils/usersGetSet';


export default async function addReclamation (req, res) {
    if (req.method == 'POST'){
        let user = await getUser(req);
        if (user!=null){
            let reclamation = await setReclamation({body:{
                description: req.body.description,
                city: req.body.city,
                district: req.body.district
            }});
            await pushRecUser({ body: { email: user.email, reclamation_id: reclamation._id } });
            res.status(200).json({
                message: "Reclamation Ajoutée",
                lienReclam: `/reclamation/${reclamation._id}`
            });
            return;
        } else if (user == null){
            let reclamation = await setReclamation({body:{
                description: req.body.description,
                city: req.body.city,
                district: req.body.district
            }});
            let newUser = await setUser(req);
            await pushRecUser({ body: { email: req.body.email, reclamation_id: reclamation._id } });
            res.status(200).json({
                message: `Pas d'utilisateur trouvée avec cet addresse mail, nous avons créé un compte pour vous avec le mot de passe: ${newUser.pwd}`,
                lienReclam: `/reclamation/${reclamation._id}`
            })
            return;
        }
        
    }
}
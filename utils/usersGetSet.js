import connectMongo from "./connectMongo";
import users from "./dbModels/users";


async function getUser(req){
    if (req.body.email){
        try {
            connectMongo();
            const user = await users.findOne({email: req.body.email});
            return user;
        } catch (err) {
            throw err;
        }
    } else {
        try {
            connectMongo();
            const user = await users.find();
            return user;
        } catch (err) {
            throw err;
        }
    }
}


async function setUser(req){
    try {
        connectMongo();
        const user = await users.create(req.body);
        return user;
    } catch (err) {
        throw err;
    }
}

async function pushRecUser(req){
    try {
        connectMongo();
        const user = await users.updateOne({email: req.body.email}, {$push: {reclamations: req.body.reclamation_id}});
        return user;
    } catch (err) {
        throw err;
    }
}

async function pullRecUser(reqbody){
    try {
        connectMongo();
        const reclamId = reqbody.reclamation_id;
        console.log('reqfrom pull req:' ,reqbody);
        const user = await users.updateOne({email: reqbody.email}, {$pull: {reclamations: { _id: '63077746ea1aa44f048602ca'}}});
        return user;
    } catch (err) {
        throw err;
    }
}

async function deleteUser(req){
    try {
        connectMongo();
        const user = await users.deleteOne({email: req.body.email});
        return user;
    } catch (err) {
        throw err;
    }
}

async function updateUser(req){
    try {
        connectMongo();
        const user = await users.findOneAndUpdate({id: req.body.user_id}, {$set: {user_type: req.body.userType, email: req.body.email, pwd: req.body.pwd}});
        return user;
    } catch (err) {
        throw err;
    }
}

export {getUser, setUser, pushRecUser, pullRecUser, deleteUser, updateUser};
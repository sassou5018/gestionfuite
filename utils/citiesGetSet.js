import connectMongo from "./connectMongo";
import cities from "./dbModels/cities";

async function getCity(req){
    if (req.body.city_name){
        try {
            connectMongo();
            const city = await cities.findOne({city_name: req.body.city_name});
            return city;
        } catch (err) {
            throw err;
        }
    } else {
        try {
            connectMongo();
            const city = await cities.find();
            return city;
        } catch (err) {
            throw err;
        }
    }
}


async function setCity(req){
    try {
        connectMongo();
        const city = await cities.create(req.body);
        return city;
    } catch (err) {
        throw err;
    }
}

async function deleteCity(req){
    try {
        connectMongo();
        const city = await cities.deleteOne({city_name: req.body.city_name});
        return city;
    } catch (err) {
        throw err;
    }
}

export {getCity, setCity, deleteCity};
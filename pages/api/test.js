import connectMongo from "../../utils/connectMongo";

export default async function test(req, res){
    try{
        console.log("Connecting To Mongo")
        await connectMongo();
        console.log("Connected To mongo")
        res.json({status: "Yes"})
    } catch(error){
        console.log(error)
        res.json({status: "no"})
    }

}
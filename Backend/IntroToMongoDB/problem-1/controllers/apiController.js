
const limitedController = (req, res)=>{
    res.json({ message: "You have access to this limited endpoint!" });
}
const publicController = (req,res)=>{
    res.json({ message: "This is a public endpoint!" });
}
module.exports = {limitedController, publicController}
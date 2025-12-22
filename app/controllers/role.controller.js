const services = require("../services/user.services.js");

function AllAccess(req, res) {
    res.status(200).send("Public Content");
}

function UserBoard(req, res) {
    res.status(200).send("User Content");
}

async function AdminBoard(req, res) {
    const user = await services.getUserDetails(req.userId)
    return res.status(200).send({
        message: 'Data retrieves successfully',
        data: user
    })
}

var roleController = {
    AllAccess: AllAccess,
    UserBoard: UserBoard,
    AdminBoard: AdminBoard
}
module.exports = roleController;
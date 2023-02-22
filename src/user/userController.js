var userService = require('./userServices');

var createUserControllerFunc = async (req, res) => {
    try {
        console.log(req.body);
        var status = await userService.createUserDBService(req.body);
        console.log(status);

        if (status) {
            res.send({ "status": true, "message": "Usuario creado" });
        } else {
            res.send({ "status": false, "message": "Error creando usuario" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

var searchUserByEmailControllerFunc = async (req, res) => {
    try {
        result = await userService.searchuserDBService(req.param('email'))
        if (result.status) {
            res.send({ "status": true, "message": result.msg })
        }
        else {
            res.send({ "status": false, "message": "Error encontrando el usuario" })
        }
    }
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserByEmailControllerFunc = async (req, res) => {
    try {
        var result = await userService.updateuserDBService(req.params.email,req.body)
        if (result.status && result) {
            res.send({ "status": true, "message": result.msg })
        }
        else {
            res.send({ "status": true, "message": "Error encontrando el usuario" })
        }
    }
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserByEmailControllerFunc = async (req, res) => {
    try {
        result = await userService.deleteuserDBService(req.param('email'));
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        }
        else {
            res.send({ "status": true, "message": "No se pudo eliminar el usuario" })
        }
    }
    catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = {
    createUserControllerFunc, loginUserControllerFunc,
    searchUserByEmailControllerFunc, updateUserByEmailControllerFunc, deleteUserByEmailControllerFunc
};
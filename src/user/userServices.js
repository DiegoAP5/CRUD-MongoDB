const { model } = require('mongoose');
var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
      var userModelData = new userModel();

      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.email = userDetails.email;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;

      userModelData.save(function resultHandle(error, result) {

         if (error) {
            reject(false);
         } else {
            resolve(true);
         }
      });
   });
}

module.exports.loginuserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               var decrypted = encryptor.decrypt(result.password);

               if (decrypted == userDetails.password) {
                  resolve({ status: true, msg: "Usuario Validado" });
               }
               else {
                  reject({ status: false, msg: "Falla en validacion de usuario" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.searchuserDBService = (search, userDetails) => {
   return new Promise(function myFN(resolve, reject) {
      userModel.findOne({ email: search },userDetails, function getResult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "No existe" })
         }
         else {
            if (result != undefined && result != null && search == result.email) {
               resolve({ status: true, msg: result })
            }
            else {
               reject({ status: false, msg: "Datos invalidos" })
            }
         }
      })
   })
}

module.exports.updateuserDBService = (search) => {
   return new Promise(function myNf(resolve, reject) {
      userModel.findOneAndUpdate({ email: search }, function getResult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "No se encontro" })
         }
         else {
            if (result != undefined && result != null && search == result.email) {
               resolve({status: true, msg: "Actualizado"})
            }
            else{
               reject({status: false, msg: "Datos invalidos"})
            }
         }
      })
   })
}

module.exports.deleteuserDBService = (search) =>{
   return new Promise(function myNf(resolve, reject){
      userModel.findOneAndDelete({email: search}, function getResult(errorvalue, result){
         if(errorvalue){
            reject({status:false,msg:"No se encontro"})
         }
         else{
            if(result != undefined && result != null && search == result.email){
               resolve({status:true,msg:"Eliminado"})
            }
            else{
               reject({status:false,msg:"Invalido"})
            }
         }
      })
   })
}
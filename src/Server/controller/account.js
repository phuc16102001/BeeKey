const jwt = require('jsonwebtoken')
const Account = require('../models/account')
const config = require('../config/config')

function login(req,res){
    data = {
        username: req.body.username,
        password: req.body.password,
    }
    Account.login(data,(err,account)=>{
        if (err) {
            res.send({
                exitcode: 1,
                token: '',
                message: err
            })
        }

        if (account.length>0){
            account = account[0]
            payload = {
                username: account.username,
            }
            res.send({
                exitcode: 0,
                token: jwt.sign(payload,config.server.secret,{
                    expiresIn: config.server.expTime
                }),
                message: "Login successfully"
            })
            console.log("[Login]: "+data.username+"/"+data.password)
        } else {
            res.send({
                exitcode: 104,
                token: '',
                message: "Incorrect password or username"
            })
        }
    })
}

function signup(req,res){
    data = {
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        name: req.body.name
    }

    Account.signup(data,(err,result)=>{
        if (err) {
            res.send({
                exitcode: 1,
                message: err
            })
        }

        if (result) {
            res.send({
                exitcode: 0,
                message: "Create account successfully"
            })
            console.log("[Signup]: "+data.username)
        }
    })
}

function getInformation(req,res){
    data = {
        username: req.payload.username
    }

    Account.getInformation(data,(err,result)=>{
        if (err) {
            res.send({
                exitcode: 1,
                message: err
            })
        }

        if (result && result.length>0) {
            account = result[0]
            res.send({
                exitcode: 0,
                message: "Successfully get information",
                username: account.username,
                name: account.name,
                gender: account.gender,
                phone: account.phone,
                address: account.address,
                coin: account.coin
            })
        } else {
            res.send({
                exitcode: 1,
                message: 'Failed to get information'
            })
        }
    })
}

function changePassword(req,res) {
    data = {
        username: req.payload.username,
        newPassword: req.body.newPassword,
        oldPassword: req.body.oldPassword
    }
    Account.getPassword(data,(err,result)=>{
        if (err) {
            res.send({
                exitcode: 1,
                message: res
            })
        }
        
        if (result && result.length>0) {
            oldPassword = result[0].password
            if (oldPassword!=data.oldPassword) {
                res.send({
                    exitcode: 104,
                    message: "Old password not correct"
                })
                return;
            }

            Account.changePassword(data,(err,result)=>{
                if (err) {
                    res.send({
                        exitcode: 1,
                        message: err
                    })
                }

                if (result) {
                    res.send({
                        exitcode: 0,
                        message: "Change password successfully"
                    })
                }
            })
        } else {
            res.send({
                exitcode: 3,
                message: "Username not found"
            })
        }
    })
}

function changeInformation(req,res) {
    changes = {
        phone: req.body.phone,
        address: req.body.address,
        name: req.body.name,
        gender: req.body.gender
    }
    Object.keys(changes).forEach(key=>{
        if (changes[key]===undefined) {
            delete changes[key]
        }
    })
    data = {
        changes,
        username: req.payload.username
    }
    Account.changeInformation(data,(err,result)=>{
        if (err) {
            res.send({
                exitcode: 1,
                message: err
            })
            return;
        }

        affectedRows = result.affectedRows
        if (affectedRows!=null && affectedRows>0){
            res.send({
                exitcode: 0,
                message: "Change successfully"
            })
        } else {
            res.send({
                exitcode: 3,
                message: "Username not found"
            })
        }
    });
}

module.exports = {
    login,
    signup,
    getInformation,
    changePassword,
    changeInformation
}
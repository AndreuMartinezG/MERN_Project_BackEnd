const ThreadsController = {};
const authConfig = require('../config/auth');
const Thread = require('../models/threads.js');


ThreadsController.threadCreation = async (req, res) => {

    let id_owner = req.body.id_owner
    let userName_owner = req.body.userName_owner
    let headLine = req.body.headLine

    Thread.find({
        headLine: headLine

    }).then(data => {

        if(data == false){

            Thread.create({
                id_owner: id_owner,
                userName_owner: userName_owner,
                headLine: headLine
            }).then(thread =>{
                res.send(`${thread.headLine} thread created`)
            }).catch(error =>{
                res.send(error)
            })


        } else {
            res.send("This thread already exists")
        }

    }).catch(error => {
        res.send(error)
    })

}

module.exports = ThreadsController;
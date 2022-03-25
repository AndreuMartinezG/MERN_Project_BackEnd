const ThreadsController = {};
const { threadId } = require('worker_threads');
const authConfig = require('../config/auth');
const Thread = require('../models/threads.js');


//Creacion de nuevos Threads
ThreadsController.threadCreation = async (req, res) => {

    let id_owner = req.body.id_owner
    let userName_owner = req.body.userName_owner
    let headLine = req.body.headLine

    Thread.find({
        headLine: headLine

    }).then(data => {

        if (data == false) {

            Thread.create({
                id_owner: id_owner,
                userName_owner: userName_owner,
                headLine: headLine
            }).then(thread => {
                res.send(`${thread.headLine} thread created`)
            }).catch(error => {
                res.send(error)
            })


        } else {
            res.send("This thread already exists")
        }

    }).catch(error => {
        res.send(error)
    })

}

//Delete Threads by Id
ThreadsController.threadDelete = async (req, res) => {

    let _id = req.body._id

    try {

        await Thread.findByIdAndDelete({
                _id: _id
            })
            .then(threadDelete => {
                console.log(threadDelete);
                res.send(`The Thread named ${threadDelete.headLine} has been deleted`);
            }).catch(error => {
                res.send(error)
            })

    } catch (error) {
        res.send(error);
    }
}

//All Threads
ThreadsController.threadAll = async (req, res) => {

    try {

        await Thread.find()
            .then(data => {
                res.send(data)
            }).catch(error => {
                res.send(error)
            })

    } catch (error) {

        res.send(error)
    }
}

//New Post
ThreadsController.threadNewPost = async (req, res) => {

    let _id = req.body._id

    let id_owner = req.body.id_owner
    let userName_owner = req.body.userName_owner
    let headLine_post = req.body.headLine_post
    let text_post = req.body.text_post

    // Enviar Mensaje al usuario que ya sigue a esa persona
    try {
        await Thread.findOneAndUpdate({
            _id: _id
        }, {
            $push: {
                post: {
                    "id_owner": id_owner,
                    "userName_owner": userName_owner,
                    "headLine_post": headLine_post,
                    "text_post": text_post
                }
            }
        })
        res.send("New Post Created")

    } catch (error) {
        res.send(error)
    }
}

//Delete Post by Id Owner //////////////////////////////////////// POR TERMINAR ///////////////////////////////////////
ThreadsController.threadPostDelete = async (req, res) => {


    let postId = req.body.postId;
    let threadId = req.body.threadId;
    //Create empty array for manage the followed field
    console.log("aqui tamoooooooooo")
    let post = [];
    try {
        //Find owner user
        await Thread.find({
            _id: threadId
        }).then(elmnt => {
            //Save actual followed array the variable
            post = elmnt[0].post;

            //Find desired user id to unfollow
            console.log(post)
            for (let i = 0; i < post.length; i++) {
                if (post[i]._id == postId) {
                    //remove it of followed array
                    post.splice(i, 1)
                }
                console.log(post[i])
            }
            //Update followed users
            Thread.updateOne({
                    _id: threadId
                }, {

                    $set: {

                        post: post
                    }
                }) //If promise is done, response the edited user
                .then(elmnt => {
                    Thread.find({
                        _id: threadId
                    }).then(thread => {
                        res.send(thread)
                    })
                })
        })
    } catch (error) {
        res.send("backend edit user error: ", error);
    }
}

module.exports = ThreadsController;
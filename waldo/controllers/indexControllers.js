const Character = require('../models/character')
const Game = require('../models/game')

function checkLocation(req,res){
    const name = req.body.name;
    const clientLeft = req.body.left;
    const clientTop = req.body.top;
    console.log(name)
    console.log(clientLeft)
    console.log(clientTop)
    Character.find({name:name})
    .then((result) => {
        const serverLeft = result[0].left;
        const serverTop = result[0].top;
        if(
            (clientLeft < serverLeft +.03 && clientLeft > serverLeft -.03)
            &&(clientTop < serverTop +.03 && clientTop > serverTop -.03)
        ){
            res.json('correct')
        }else{
        res.json('incorrect')}})
    .catch((err)=> err)
}

function startGame(req,res){
    const currentDate = new Date();
    gameDetails = {
        start: currentDate
    }

    const newGame = new Game(gameDetails)
    newGame.save()
    .then( result => {
        res.status(200).json(result._id)})
    .catch((err)=>{res.status(500).json()})
}

function endGame(req,res){
    const id = req.body.gameId
    const currentDate = new Date()
    Game.findByIdAndUpdate(id, { end: currentDate})
    .then(res.status(200).json('Updated Endtime'))
    .catch(err => res.status(500).json(err))
}

function updateUsername(req,res){
    const id = req.body.gameId;
    const username = req.body.username;
    Game.findByIdAndUpdate(id, { username: username })
    .then(res.status(200).json('Updated Username'))
    .catch(err  => res.status(500).json(err))
}

function getScores(req, res){
    Game.find({ username : {$ne : undefined}})
    .then(result => {res.json(result)})
    .catch(err => res.json(err))
}

module.exports = {
    checkLocation,
    startGame,
    endGame,
    updateUsername,
    getScores
}
const logsModel = require('../models')['logs']
const usersModel = require('../models')['users']
const { Op } = require('sequelize')
const {Sequelize} = require('sequelize')


let Logs = {}

Logs.getAll = async (req, res, next) => {
  const data = await logsModel.findAll({ 
    group: ['level','system','description','message','createdAt'],
    attributes: ['level','system','description','message','createdAt',[Sequelize.fn('COUNT', 'id'), 'Event']],
    where: {userId: req.userId}
  })
  res.status(200).json( data )
}

Logs.getByLevel = async (req, res, next) => {
  const {level} = req.params
  await logsModel.findAll({
    group: ['level','system','description','message','createdAt'],
    attributes: ['level','system','description','message','createdAt',[Sequelize.fn('COUNT', 'id'), 'Event']],
    where: {
      [Op.and]:[
        {level: level},
        {userId: req.userId}
      ]
    }
  }).then(result => {
    if(!result.length){
      return res.status(404).send("Nada encontrado")
    }
    res.status(200).json(result)
  })
}

Logs.getBySystem = async (req, res, next) => {
  const {system} = req.params
  await logsModel.findAll({
    group: ['level','system','description','message','createdAt'],
    attributes: ['level','system','description','message','createdAt',[Sequelize.fn('COUNT', 'id'), 'Event']],
    where: {
      [Op.and]:[
        {system: system},
        {userId: req.userId}
      ]
    }
  }).then(result => {
    if(!result.length){
      return res.status(404).send("Nada encontrado")
    }
    res.status(200).json(result)
  })
}

Logs.create = async (req, res, next) => {
  const result = await logsModel.create({
    "level":req.body.level,
    "description":req.body.description,
    "message": req.body.message,
    "system": req.body.system,
    "userId": req.userId}
    )
  res.status(201).json(result)
}

module.exports = Logs

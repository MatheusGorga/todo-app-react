const express = require('express')

module.exports = function(server){
    //API routes
    const router = express.Router()
    server.use('/api', router)

    //Todo Routes
    const todoService = require('../api/todo/todoService')
    todoService.register(router, '/todos')
}
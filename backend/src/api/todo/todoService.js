const Todo = require('./todo')

Todo.methods(['get','post', 'put','delete'])
Todo.updateOptions({new: true, runValidadors:true})

module.exports = Todo
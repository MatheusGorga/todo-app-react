import React, {Component} from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = 'http://localhost:3003/api/todos'


export default class Todo extends Component{
    constructor(props){
        super(props)
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkDone = this.handleMarkDone.bind(this) 
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this) 



        this.refresh()

    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        Axios.get(`${URL}?sort=-cratedAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
            .then(resp => console.log(this.state.list))
    }

    

    handleChange(e){
       this.setState({ ...this.state, description: e.target.value})
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleClear(){
        this.refresh()
    }
    

    handleAdd(){
        const description = this.state.description 
        Axios.post(URL, { description } )
            .then(resp => this.refresh())
    }

    handleRemove(todo){
        Axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.refresh(this.state.description))
        
    }

    handleMarkDone(todo){
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
        .then(resp => this.refresh(this.state.description) )
    }

    handleMarkAsPending(todo){
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
        .then(resp => this.refresh(this.state.description))
    }

    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />                
                <TodoForm   description={this.state.description} 
                            handleAdd={this.handleAdd}  
                            handleChange={this.handleChange}
                            handleSearch={this.handleSearch}
                            handleClear={this.handleClear} />
                            
                <TodoList   list={this.state.list}
                            handleRemove={this.handleRemove} 
                            handleMarkDone={this.handleMarkDone}
                            handleMarkAsPending={this.handleMarkAsPending}/>
            </div>
        )
    }
}
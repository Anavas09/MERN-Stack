import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';

class TodosList extends Component {
    constructor(props){
        super(props)

        this.state = {
            todos: []
        }
    }

    async componentDidMount(){
        await axios.get('http://localhost:4000/todos')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err =>{
                console.log(err)
            })
    }

    async handleDelete(id){
        // eslint-disable-next-line no-restricted-globals
        if(confirm('¿Are you sure?')){
            axios.delete(`http://localhost:4000/todos/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        await axios.get('http://localhost:4000/todos')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            })
            .catch(err =>{
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>TodosList Component</h1>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map((todo,i) =>{
                                return <Todo
                                            key={i}
                                            todo={todo}
                                            handleDelete={(id)=>{this.handleDelete(id)}}
                                        />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TodosList;
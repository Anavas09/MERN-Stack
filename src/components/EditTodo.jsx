import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
    constructor(props){
        super(props)

        this.state = {
            todo_complete: false,
            todo_description: '',
            todo_priority: '',
            todo_responsible: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnChangeChecked = this.handleOnChangeChecked.bind(this)
        this.handleOnSubmit= this.handleOnSubmit.bind(this)
    }

    async componentDidMount(){
        const { id } = this.props.match.params
        await axios.get(`http://localhost:4000/todos/${id}`)
            .then(res => {
                this.setState({
                    todo_complete: res.data.todo_complete,
                    todo_description: res.data.todo_description,
                    todo_priority: res.data.todo_priority,
                    todo_responsible: res.data.todo_responsible

                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleOnChange(e){
        console.log(`Name: ${e.target.name}, Value: ${e.target.value}`)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnChangeChecked(e){
        console.log(`Name: ${e.target.name}, Value: ${e.target.value}`)
        this.setState({
            todo_complete: !this.state.todo_complete
        })
    }

    handleOnSubmit(e){
        e.preventDefault();
        const { id } = this.props.match.params

        const updateTodo = {
            todo_complete: this.state.todo_complete,
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_responsible: this.state.todo_responsible
        }

        axios.put(`http://localhost:4000/todos/update/${id}`, updateTodo)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        this.props.history.push('/')
    }


    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>EditTodo Component</h1>
                <h3>Update todo</h3>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            name="todo_description"
                            className="form-control"
                            value={this.state.todo_description}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            name="todo_responsible"
                            className="form-control"
                            value={this.state.todo_responsible}
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                name="todo_priority"
                                className="form-check-input"
                                onChange={this.handleOnChange}
                                type="radio"
                                value="Low"
                                id="priorityLow"
                                checked={this.state.todo_priority==="Low"}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                name="todo_priority"
                                className="form-check-input"
                                onChange={this.handleOnChange}
                                type="radio"
                                value="Medium"
                                id="priorityMedium"
                                checked={this.state.todo_priority==="Medium"}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                name="todo_priority"
                                className="form-check-input"
                                onChange={this.handleOnChange}
                                type="radio"
                                value="High"
                                id="priorityHigh"
                                checked={this.state.todo_priority==="High"}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="completedCheckbox"
                            name="todo_complete"
                            value={this.state.todo_complete}
                            checked={this.state.todo_complete}
                            onChange={this.handleOnChangeChecked}
                        />
                        <label
                            className="foem-check-label"
                            htmlFor="completedCheckbox"
                        >Completed
                        </label>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Update Todo" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditTodo;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo_complete: false,
            todo_description: '',
            todo_priority: '',
            todo_responsible: ''
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onChangeInput(e){
        console.log(`Name: ${e.target.name}, Value: ${e.target.value}`)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit(e){
        console.log(!this.state.todo_complete)

        const newTodo = {
            todo_complete: this.state.todo_complete,
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_responsible: this.state.todo_responsible
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data))
        
        this.setState({
            todo_complete: !this.state.todo_complete,
            todo_description: '',
            todo_priority: '',
            todo_responsible: ''
        })
        e.preventDefault();
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h1 style={{textAlign: "center"}}>CreateTodo Component</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            name="todo_description"
                            className="form-control"
                            onChange={this.onChangeInput}
                            type="text"
                            value={this.state.todo_description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible:</label>
                        <input
                            className="form-control"
                            name="todo_responsible"
                            onChange={this.onChangeInput}
                            type="text"
                            value={this.state.todo_responsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                name="todo_priority"
                                className="form-check-input"
                                onChange={this.onChangeInput}
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
                                onChange={this.onChangeInput}
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
                                onChange={this.onChangeInput}
                                type="radio"
                                value="High"
                                id="priorityHigh"
                                checked={this.state.todo_priority==="High"}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Create Todo" />
                    </div>
                </form>
            </div>
        );
    }
}

CreateTodo.propTypes = {

};

export default CreateTodo;
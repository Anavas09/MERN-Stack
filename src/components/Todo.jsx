import React from 'react';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';


const Todo = (props) => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <IconButton
                variant="contained"
                color="primary">
                    <Link
                        to={`/edit/${props.todo._id}`}>
                        <Edit />
                    </Link>
            </IconButton>
        </td>
        <td>
            <IconButton 
                onClick={()=>{props.handleDelete(props.todo._id)}}
                variant="contained"
                color="secondary">
                    <DeleteForeverIcon />
            </IconButton>
        </td>
    </tr>
);

export default Todo;
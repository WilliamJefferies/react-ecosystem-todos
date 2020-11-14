import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {getCompletedTodos, getIncompleteTodos} from "./selectors";
import {loadTodos, removeTodoRequest, markTodoAsCompletedRequest} from "./thunks";
import './TodoList.css';

const TodoList = ({completedTodos, incompleteTodos, onRemovedPressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <div className="list-wrapper">
            <NewTodoForm/>
            <h3>Incomplete:</h3>
            {incompleteTodos.map(todo =>
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovedPressed}
                    onCompletedPressed={onCompletedPressed}/>)}
            <h3>Completed:</h3>
            {completedTodos.map(todo =>
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovedPressed}
                    onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );

    return isLoading ? loadingMessage : content
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    getIncompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state)
});

const mapDispatchToProps = dispatch => ({
    onRemovedPressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
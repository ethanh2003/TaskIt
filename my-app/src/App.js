import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={TodoList} />
                    <Route path="/add" component={AddTodo} />
                    <Route path="/edit/:id" component={EditTodo} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

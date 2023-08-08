import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TaskList from './TaskList';
import AddTask from './AddTask';
import EditTask from './EditTask';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

const App = () => {
    const [user, setUser] = useState(null);


    const handleLogin = (userData) => {

        setUser(userData);
    };


    const handleLogout = () => {

        setUser(null);
    };

    return (
        <Router>
            <div className="App">
                <Switch>
                    {}
                    <Route
                        exact
                        path="/login"
                        render={() => (user ? <Redirect to="/" /> : <UserLogin handleLogin={handleLogin} />)}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => (user ? <Redirect to="/" /> : <UserRegister handleLogin={handleLogin} />)}
                    />

                    {}
                    {user ? (
                        <>
                            <Route exact path="/" component={TaskList} />
                            <Route exact path="/add" component={AddTask} />
                            <Route exact path="/edit/:id" component={EditTask} />
                            <Route exact path="/register" component={UserRegister} />
                            <Route exact path="/login" component={UserLogin} />
                        </>
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Switch>
            </div>
        </Router>
    );
};

export default App;

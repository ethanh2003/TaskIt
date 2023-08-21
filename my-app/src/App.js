import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TaskList from './TaskList';
import AddTask from './AddTask';
import EditTask from './EditTask';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';

const App = () => {
    const [user, setUser] = useState(null);


    const handleLogin = (sessionToken, userId) => {
        setUser({ sessionToken, userId });
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
                        render={() => (user ? <Redirect to="/tasks" /> : <UserLogin handleLogin={handleLogin} />)}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => (user ? <Redirect to="/tasks" /> : <UserRegister handleLogin={handleLogin} />)}
                    />

                    {}
                    {user ? (
                        <>
                            <Route exact path="/tasks" component={TaskList} />
                            <Route exact path="/add" component={AddTask} />
                            <Route exact path="/tasks/:id" component={EditTask} />
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

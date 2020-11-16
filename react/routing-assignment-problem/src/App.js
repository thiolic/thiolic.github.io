import React, {Component} from 'react';
import {Route, NavLink} from "react-router-dom";

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Course from "./containers/Course/Course";

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/users">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/courses">Courses</NavLink>
                        </li>
                    </ul>
                </nav>
                <Route path="/users" component={Users}/>
                <Route path="/courses" exact component={Courses}/>
                <Route path="/courses/:courseId" component={Course}/>
                <ol style={{textAlign: 'left'}}>
                    <li>Pass the course ID to the "Course" page and output it there</li>
                    <li>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing
                        it as query params (you need to manually parse them though!)
                    </li>
                    <li>Load the "Course" component as a nested component of "Courses"</li>
                    <li>Add a 404 error page and render it for any unknown routes</li>
                    <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
                </ol>
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";

import './Courses.css';
import Course from "../Course/Course";

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    };

    render () {
        const { courses } = this.state;
        const { match: { url } } = this.props;

        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        courses.map( ( { id, title } ) => {
                            return (
                                <Link
                                    key={id}
                                    to={{
                                        pathname: url + '/' + id,
                                        search: '?title=' + title
                                    }}
                                >
                                    <article className="Course" key={id}>{title}</article>
                                </Link>
                            )
                        } )
                    }
                </section>
                <Route path={url + '/:courseId'} component={Course}/>
            </div>
        );
    }
}

export default Courses;

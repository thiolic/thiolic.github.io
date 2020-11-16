import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: ''
    };

    componentDidMount() {
        console.log(this.props);
        const { location: { search } } = this.props;

        console.log(search);

        const query = new URLSearchParams(search);

        for (let param of query.entries()) {
            this.setState({ courseTitle: param[1] });
        }
    }

    render () {
        const { match: { params: { courseId } } } = this.props;
        const { courseTitle } = this.state;

        return (
            <div>
                <h1>{courseTitle}</h1>
                <p>You selected the Course with ID: {courseId}</p>
            </div>
        );
    }
}

export default Course;

import React, { Component } from 'react';
import axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        const id = this.props.match.params.id;
        const { loadedPost } = this.state;
        if (id) {
            if ( !loadedPost || ( loadedPost && loadedPost.id !== +id ) ) {
                axios.get('/posts/' + id)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }

    deletePostHandler = () => {
        const id = this.props.match.params.id;

        axios.delete('/posts/' + id)
            .then(response => {
                console.log(response);
            })
    };

    render () {
        const { loadedPost } = this.state;
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        const id = this.props.match.params.id;

        if (id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        if (loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{loadedPost.title}</h1>
                    <p>{loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;

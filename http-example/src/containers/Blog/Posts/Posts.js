import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Post from '../../../components/Post/Post'
import axios from "../../../axios";
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Name'
                    }
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
                // this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    };

    render() {
        const { posts, error } = this.state;
        let postsRender = <p>Something went wrong!</p>;

        if (!error) {
            postsRender = posts.map(post => {
                return (
                    <Link to={'/' + post.id} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    </Link>
                )
            });
        }

        return (
            <section className="Posts">
                {postsRender}
            </section>
        )
    }
}

export default Posts;

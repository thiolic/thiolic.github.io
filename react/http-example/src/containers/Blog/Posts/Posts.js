import React, { Component } from 'react';
import axios from "../../../axios";
import { Route } from "react-router-dom";

import './Posts.css';
import Post from '../../../components/Post/Post'
import FullPost from "../FullPost/FullPost";

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
        this.props.history.push({pathname: '/posts/' + id});
    };

    render() {
        const { posts, error } = this.state;
        let postsRender = <p>Something went wrong!</p>;

        if (!error) {
            postsRender = posts.map(post => {
                return (
                    // <Link to={'/posts' + post.id} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    // </Link>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {postsRender}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts;

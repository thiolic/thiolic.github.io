import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts'
import asyncComponent from "../../hoc/asyncComponent";
// import NewPost from "./NewPost/NewPost";
const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    };

    render () {
        const { auth } = this.state;
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/posts/" exact>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/new-post">New post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;

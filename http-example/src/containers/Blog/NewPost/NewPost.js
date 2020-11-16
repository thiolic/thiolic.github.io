import React, { Component } from 'react';
import axios from '../../../axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    };

    postDataHandler = () => {
        const { title, content, author } = this.state;
        const data = {
            title,
            body: content,
            author
        };

        axios.post('/posts/', data)
            .then(response => {
                console.log(response);
            });
    };

    render () {
        const { title, content, author } = this.state;
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={title} onChange={({ target }) => this.setState({title: target.value})} />
                <label>Content</label>
                <textarea rows="4" value={content} onChange={({ target }) => this.setState({content: target.value})} />
                <label>Author</label>
                <select value={author} onChange={({ target }) => this.setState({author: target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;

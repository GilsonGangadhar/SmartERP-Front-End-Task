import React from 'react'
import { connect } from 'react-redux'
let parse = require('html-react-parser');

class PublishedPosts extends React.Component{

    render(){
        return(
            <div className="published-posts">
                <h3 className="new-post-header">Published Posts</h3>
                {
                    this.props.posts.map((post,i) => {
                        return (
                            <div className="post-card">
                                <h2 className="post-card-title">{i + 1}. {post.title}</h2>
                                <p className="post-card-body">{parse(post.body)}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        posts : state.posts
    }
}

export default connect(mapStateToProps)(PublishedPosts)
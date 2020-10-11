import React from 'react'
import NewPost from './NewPost'
import PublishedPosts from './PublishedPosts'
import { connect } from 'react-redux'
import { searchPosts } from '../actions/postAction'

class Home extends React.Component {

    constructor(){
        super()
        this.state = {
            searchedText : '',
            createPost : false,
            posts : []        
        }
    }

    handleNewPost = () => {
        this.setState({
            createPost : true
        })
    }

    handlePublished = () => {
        this.setState({
            createPost : false
        })
    }

    handleSearch = (e) => {
        const searchedText = e.target.value
        const searchedPosts = this.props.posts.filter(post => {
            return post.title.includes(searchedText) || post.body.includes(searchedText)
        })
        if(searchedText !== '') {
            this.props.dispatch(searchPosts(searchedPosts))
            this.setState({searchedText})
        } else {
            this.props.dispatch(searchPosts([]))
            this.setState({searchedText})
        }
    }
    
    render(){
        return(
            <div className="Home-container">
                <div className="search-nav">
                    <input type="search" value={this.state.searchedText} onChange={this.handleSearch} placeholder="Search"/>
                </div>
                <div className="buttons-nav">
                    <button onClick={this.handleNewPost}>New Post </button>
                    <button onClick={this.handlePublished}> Published</button>
                </div>
            
            <div className="body-wrapper">
                {
                    this.state.createPost ? <NewPost/> : <PublishedPosts/>
                }
            </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        posts : state.posts.postArray
    }
}

export default connect(mapStateToProps)(Home)
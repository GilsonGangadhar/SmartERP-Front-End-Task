import React from 'react'
import NewPost from './NewPost'
import PublishedPosts from './PublishedPosts'
import { connect } from 'react-redux'

class Home extends React.Component {

    constructor(){
        super()
        this.state = {
            searchedText : '',
            createPost : false,
            posts : [],
            searchedTitles : []
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

    handleText = (e) => {
        const searchedText = e.target.value
        const searchedTitles = this.props.posts.filter(post => {
            return post.title.includes(searchedText)
        })
        this.setState({searchedTitles})
    }
    render(){
        return(
            <div className="Home-container">
                <div className="search-nav">
                    <input type="text" value={this.state.searchedText} onChange={this.handleText} placeholder="Search"/>
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
        posts : state.posts
    }
}

export default connect(mapStateToProps)(Home)
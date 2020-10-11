const initialPostsState = {
    postArray: [],
    searchedArray: []
}

const postsReducer = (state = initialPostsState, action) => {
    switch(action.type) {
        case 'SET_POST' : 
            return {
                ...state, 
                postArray: state.postArray.concat(action.payload)
            } 
        
        case 'SEARCHED_POSTS' : 
        return {
            ...state,
            searchedArray: action.payload
        }
        
        default : {
            return {...state}
        }
    }
}

export default postsReducer
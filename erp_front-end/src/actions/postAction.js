

export const setPost = (post) => {
    return {type: 'SET_POST', payload: post}
}


export const searchPosts = (posts) => {
    return {type : 'SEARCHED_POSTS', payload : posts}
}
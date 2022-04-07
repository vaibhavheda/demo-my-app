export const FETCH_POSTS_BEGIN = "FETCH_POSTS_BEGIN";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const POST_POSTS_BEGIN = "POST_POSTS_BEGIN";
export const POST_POSTS_SUCCESS = "POST_POSTS_SUCCESS";
export const POST_POSTS_FAILURE = "POST_POSTS_FAILURE";
export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts },
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error },
});

export const postPostsBegin = () => ({
  type: POST_POSTS_BEGIN,
});

export const postPostsSuccess = (posts) => ({
  type: POST_POSTS_SUCCESS,
  payload: { posts },
});

export const postPostsFailure = (error) => ({
  type: POST_POSTS_FAILURE,
  payload: { error },
});

export const postCommentSuccess = (comments) => ({
  type: POST_COMMENT_SUCCESS,
  payload: { comments },
});

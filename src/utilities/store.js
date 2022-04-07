import { applyMiddleware, createStore } from "redux";
import { toCommentsEntry } from "../models/comment";
import { Post, toPostData } from "../models/post";
import thunk from "redux-thunk";

import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  POST_POSTS_FAILURE,
  POST_POSTS_SUCCESS,
  POST_POSTS_BEGIN,
  POST_COMMENT_SUCCESS,
  fetchPostsBegin,
  fetchPostsSuccess,
  fetchPostsFailure,
  postPostsBegin,
  postPostsSuccess,
  postPostsFailure,
  postCommentSuccess,
} from "./actions";

const initState = {
  posts: [new Post(1, 1, "Hello", "Desc")],
  comments: [],
  loading: false,
  error: null,
  titleTextField: "",
  descriptionTextField: "",
  commentTextField: "",
  selectedPost: null,
};

const postTasksReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
      };

    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        posts: [],
      };

    case POST_POSTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case POST_POSTS_SUCCESS: {
      let newPosts = [...toPostData(action.payload.posts)];
      newPosts.push(...state.posts);
      return {
        ...state,
        loading: false,
        posts: newPosts,
      };
    }

    case POST_COMMENT_SUCCESS: {
      let newComments = [...toCommentsEntry(action.payload.comments)];
      newComments.push(...state.comments);
      let d = state.posts.filter(
        (post) => post.postID !== state.selectedPost.postID
      );
      let e = state.posts.filter(
        (post) => post.postID === state.selectedPost.postID
      );
      e.push(...d);
      return {
        ...state,
        loading: false,
        comments: newComments,
        posts: e,
      };
    }
    case POST_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case "titleChanged":
      return {
        ...state,
        titleTextField: action.payload,
      };
    case "descriptionChanged":
      return {
        ...state,
        descriptionTextField: action.payload,
      };
    case "commentChanged":
      return {
        ...state,
        commentTextField: action.payload,
      };
    case "selectedPost":
      return {
        ...state,
        selectedPost: action.payload,
        comments: action.payload.comments,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export function fetchPosts() {
  return async (dispatch) => {
    dispatch(fetchPostsBegin());
    return fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((commentsData) => {
        let commentsDataEntries = toCommentsEntry(commentsData);
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            dispatch(fetchPostsSuccess(toPostData(data, commentsDataEntries)));
          })
          .catch((error) => {
            dispatch(fetchPostsFailure(error));
            console.log("Error while fetching data");
          });
      });
  };
}

export function PostComment(id, newComment) {
  return (dispatch) => {
    dispatch(postPostsBegin());

    fetch("https://jsonplaceholder.typicode.com/posts/" + id + "/comments", {
      method: "POST",
      body: JSON.stringify({
        postId: newComment.postID,
        name: newComment.name,
        body: newComment.body,
        email: newComment.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((json) => {
        dispatch(postCommentSuccess([json]));
        return json;
      })
      .catch((error) => {
        dispatch(postPostsFailure(error));
        console.log("Error while posting data");
      });
  };
}

export function PostPost(newPost) {
  return (dispatch) => {
    dispatch(postPostsBegin());

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: newPost.title,
        body: newPost.body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((json) => {
        console.log(json);
        dispatch(postPostsSuccess([json]));
        return json;
      })
      .catch((error) => {
        dispatch(postPostsFailure(error));
        console.log("Error while posting data");
      });
  };
}

export const store = createStore(postTasksReducer, applyMiddleware(thunk));

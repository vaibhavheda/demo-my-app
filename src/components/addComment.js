import { useDispatch } from "react-redux";
import { Comment } from "../models/comment";

import { PostComment } from "../utilities/store";
import "./styles/addpost.css";

export function AddPostComment({ comment, id }) {
  const dispatch = useDispatch();
  function onChangeComment(e) {
    dispatch({ type: "commentChanged", payload: e.target.value });
  }

  function addComment() {
    dispatch(
      PostComment(
        id,
        new Comment(0, id, "Random Name", comment, "xyz@gmail.com")
      )
    );
  }

  return (
    <>
      <div className="addPostContainer">
        <div className="titlePost">Add Post</div>
        <div>
          <div className="field">
            <input
              type="text"
              placeholder="Your Comment"
              name="comment"
              value={comment}
              onChange={onChangeComment}
            />
          </div>
        </div>
        <div className="button">
          <input type="button" value="Add Comment" onClick={addComment} />
        </div>
      </div>
    </>
  );
}

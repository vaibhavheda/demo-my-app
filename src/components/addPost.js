import { useDispatch } from "react-redux";
import { Post } from "../models/post";
import { PostPost } from "../utilities/store";
import "./styles/addpost.css";
export function AddPostComp({ title, description }) {
  const dispatch = useDispatch();

  function onChangeTitle(e) {
    dispatch({ type: "titleChanged", payload: e.target.value });
  }

  function onChangeDesc(e) {
    dispatch({ type: "descriptionChanged", payload: e.target.value });
  }

  function addPost() {
    dispatch(PostPost(new Post(0, 0, title, description)));
  }

  return (
    <>
      <div className="addPostContainer">
        <div className="titlePost">Add Post</div>
        <div>
          <div className="field">
            <input
              type="text"
              placeholder="Title"
              name="postTitle"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Description"
              name="postDescription"
              value={description}
              onChange={onChangeDesc}
            />
          </div>
        </div>
        <div className="button">
          <input type="button" value="Add Post" onClick={addPost} />
        </div>
      </div>
    </>
  );
}

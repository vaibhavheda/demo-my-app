import { loadingSpinner } from "./components/loading";
import { DisplayPost } from "./components/displayPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./App.css";
import { fetchPosts } from "./utilities/store";
import { AddPostComp } from "./components/addPost";
import { PostCard } from "./components/postCardDesign";
import { DisplayComments } from "./components/commentsList";
import { AddPostComment } from "./components/addComment";

function App() {
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const title = useSelector((state) => state.titleTextField);
  const description = useSelector((state) => state.descriptionTextField);
  const selectedPost = useSelector((state) => state.selectedPost);
  const comment = useSelector((state) => state.commentTextField);
  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const onCardTapHandler = (postData) => {
    dispatch({ type: "selectedPost", payload: postData });
  };
  return (
    <div>
      <div className="topHeader">Post Dashboard</div>
      {loading ? (
        loadingSpinner()
      ) : (
        <>
          {selectedPost ? (
            <PostCard post={selectedPost} isExpanded={true} />
          ) : (
            <></>
          )}
          <div className="flexContianer-add">
            <div className="leftSide">
              {selectedPost ? (
                <DisplayComments comments={comments} />
              ) : (
                <DisplayPost posts={posts} onCardTap={onCardTapHandler} />
              )}
            </div>
            <div className="rightSide">
              {selectedPost ? (
                <AddPostComment comment={comment} id={selectedPost.postID} />
              ) : (
                <AddPostComp title={title} description={description} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

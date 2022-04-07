import React from "react";
import "./styles/postCard.css";

function PostCardDesign({ post, onCardTap, isExpandView = false }) {
  const onClick = () => {
    if (!isExpandView) onCardTap(post);
  };

  return (
    <div
      key={post.postID}
      className={isExpandView ? "cardExpandedContianer" : "cardContainer"}
      onClick={onClick}
    >
      {post === undefined ? (
        ""
      ) : (
        <div>
          <div className="title">{post.title}</div>
          <div className="body">{post.body}</div>
          {post.comments === undefined ? (
            <></>
          ) : (
            <div className="lastComment">{post.getLatestComment().name}</div>
          )}
        </div>
      )}
    </div>
  );
}

export const PostCard = React.memo(PostCardDesign);

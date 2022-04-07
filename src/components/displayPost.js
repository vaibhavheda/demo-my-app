import { PostCard } from "./postCardDesign";
import React from "react";

function DisplayPostList({ posts, onCardTap }) {
  return Array.isArray(posts) ? (
    <div>
      {posts.map((postV) => (
        <PostCard onCardTap={onCardTap} post={postV} />
      ))}
    </div>
  ) : (
    PostCard(posts)
  );
}

export const DisplayPost = React.memo(DisplayPostList);

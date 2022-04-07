import CommentCard from "./commentCard";
import React from "react";

export function DisplayCommentsList({ comments }) {
  return Array.isArray(comments) ? (
    <div>{comments.map((postV) => CommentCard(postV))}</div>
  ) : (
    CommentCard(comments)
  );
}

export const DisplayComments = React.memo(DisplayCommentsList);

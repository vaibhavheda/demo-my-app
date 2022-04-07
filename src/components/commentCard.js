import "./styles/postCard.css";

function CommentCard(comment) {
  return (
    <div key={comment.userID} className={"cardContainer"}>
      {comment === undefined ? (
        ""
      ) : (
        <div>
          <div className="body">{comment.body}</div>
          <div className="lastComment">{comment.email}</div>
        </div>
      )}
    </div>
  );
}

export default CommentCard;

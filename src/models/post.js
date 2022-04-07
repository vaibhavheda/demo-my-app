export class Post {
  constructor(userID, postID, title, body, comments = []) {
    this._postID = postID === undefined ? 0 : postID;
    this._userID = userID === undefined ? 0 : userID;
    this._title = title === undefined ? "" : title;
    this._body = body === undefined ? "" : body;
    this._comments = comments === undefined ? [] : comments;
  }
  get title() {
    return this._title;
  }
  get body() {
    return this._body;
  }
  get userID() {
    return this._userID;
  }
  get postID() {
    return this._postID;
  }
  get comments() {
    return this._comments;
  }
  getLatestComment() {
    return this._comments.length > 0
      ? this._comments[this._comments.length - 1]
      : [];
  }
}

export function toPostData(data, commentsData = []) {
  let dataEntries = [];
  data.forEach((element) => {
    dataEntries.push(
      new Post(
        element.userId,
        element.id,
        element.title,
        element.body,
        commentsData.filter((element2) => element2.postID === element.id)
      )
    );
  });
  return dataEntries;
}

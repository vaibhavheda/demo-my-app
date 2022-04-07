export class Comment {
  constructor(userID, postID, name, body, email) {
    this._postID = postID === undefined ? 0 : postID;
    this._userID = userID === undefined ? 0 : userID;
    this._name = name === undefined ? "" : name;
    this._body = body === undefined ? "" : body;
    this._email = email === undefined ? "" : email;
  }
  get name() {
    return this._name;
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
  get email() {
    return this._email;
  }
}

export function toCommentsEntry(data) {
  let dataEntries = [];
  data.forEach((element) => {
    dataEntries.push(
      new Comment(
        element.id,
        element.postId,
        element.name,
        element.body,
        element.email
      )
    );
  });
  return dataEntries;
}

export class Comment {
  private _postId: number;
  public get postId(): number {
    return this._postId;
  }
  public set postId(v: number) {
    this._postId = v;
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _email: string;
  public get email(): string {
    return this._email;
  }
  public set email(v: string) {
    this._email = v;
  }

  private _body: string;
  public get body(): string {
    return this._body;
  }
  public set body(v: string) {
    this._body = v;
  }

  constructor(
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
  ) {
    this._postId = postId;
    this._id = id;
    this._name = name;
    this._email = email;
    this._body = body;
  }
}

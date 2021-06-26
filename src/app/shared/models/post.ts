export class Post {
  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _userId: number;
  public get userId(): number {
    return this._userId;
  }
  public set userId(v: number) {
    this._userId = v;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v;
  }

  private _body: string;
  public get body(): string {
    return this._body;
  }
  public set body(v: string) {
    this._body = v;
  }

  constructor(userId: number, title: string, body: string) {
    this._userId = userId;
    this._title = title;
    this._body = body;
  }

  postToObject(): any {
    return {
      userId: this.userId,
      title: this.title,
      body: this.body,
    };
  }
}

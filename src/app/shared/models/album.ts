export class Album {
  private _userId: number;
  public get userId(): number {
    return this._userId;
  }
  public set userId(v: number) {
    this._userId = v;
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _title: string;
  public get title(): string {
    return this._title;
  }
  public set title(v: string) {
    this._title = v;
  }

  constructor(userId: number, id: number, title: string) {
    this._userId = userId;
    this._id = id;
    this._title = title;
  }

  albumToObject(): any {
    return {
      userId: this.userId,
      id: this.id,
      title: this.title,
    };
  }
}

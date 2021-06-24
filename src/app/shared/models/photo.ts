export class Photo {
  private _albumId: number;
  public get albumId(): number {
    return this._albumId;
  }
  public set albumId(v: number) {
    this._albumId = v;
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

  private _url: string;
  public get url(): string {
    return this._url;
  }
  public set url(v: string) {
    this._url = v;
  }

  private _thumbnailUrl: string;
  public get thumbnailUrl(): string {
    return this._thumbnailUrl;
  }
  public set thumbnailUrl(v: string) {
    this._thumbnailUrl = v;
  }

  constructor(
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
  ) {
    this._albumId = albumId;
    this._id = id;
    this._title = title;
    this._url = url;
    this._thumbnailUrl = thumbnailUrl;
  }
}

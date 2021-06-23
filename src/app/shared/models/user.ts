export class User {
  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(v: number) {
    this._id = v;
  }

  private _username: string;
  public get username(): string {
    return this._username;
  }
  public set username(v: string) {
    this._username = v;
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

  private _role: string;
  public get role(): string {
    return this._role;
  }
  public set role(v: string) {
    this._role = v;
  }

  constructor(
    id: number,
    username: string,
    name: string,
    email: string,
    role: string
  ) {
    this._id = id;
    this._username = username;
    this._name = name;
    this._email = email;
    this._role = role;
  }

  userToObject(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      role: this.role,
    };
  }
}

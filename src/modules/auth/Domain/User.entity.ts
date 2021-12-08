export class User {
  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(id: string, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

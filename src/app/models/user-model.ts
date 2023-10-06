export class User {
  id = 0;
  name = "";
  birthday = new Date();
  identifiant = "";
  password = "";
  admin = false;

  constructor(params?: Partial<User>) {
    Object?.assign(this, params);
  }
}

export interface UserDTO {
  identifiant: string;
  password: string;
}

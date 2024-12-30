export class User {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    
    constructor(id: number, name: string, surname: string, username: string, email: string, password: string) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.username = username;
      this.email = email;
      this.password = password;
    }
  }
  
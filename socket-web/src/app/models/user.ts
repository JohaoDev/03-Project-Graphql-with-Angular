// export class User {
//   name: string;
//   lastname: string;
//   age: number;
//   email: string;
//   profile_pic: string;
//   password: string;
//   rol: string;
//   createAt: string;
//   sessionID: string;
// }

export interface User {
  _id?: string;
  name: string;
  lastname: string;
  age: number;
  email: string;
  profile_pic: string;
  rol: string;
  password?: string;
  createAt?: string;
  sessionID?: string;
}

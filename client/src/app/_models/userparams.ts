import { User } from "./user";

export class UserParams {
  gender: string;
  minAge = 18;
  maxAge = 1000;
  pageNumber = 1;
  pageSize = 5;
  orderBy: string = 'lastActive';


  constructor(user: User | null) {
    this.gender = user?.gender === 'female' ? 'male' : 'female';
  }
}

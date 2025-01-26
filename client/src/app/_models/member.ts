import { Photo } from "./photo";

export interface Member {
  id: number;
  userName: string;
  age: number;
  photoUrl: string;
  knownAs: string;
  created: Date;
  lastEntry: Date;
  lastActive: Date;
  gender: string;
  introduction: string;
  intrests?: any;
  lookingFor: string;
  city: string;
  country: string;
  photos: Photo[];
}


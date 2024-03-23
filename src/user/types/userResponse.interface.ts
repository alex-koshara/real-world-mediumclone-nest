import { UserType } from './user.type';

export interface IUserResponseInterface {
  user: UserType & { token: string };
}

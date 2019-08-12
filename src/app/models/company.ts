import { UserModel } from './user';

export interface CompanyModel {
  clientId: string;
  name: string;
  isDeleted: boolean;
  expiryDate: Date;
  subscriptionStatus: boolean;
  user: UserModel
}

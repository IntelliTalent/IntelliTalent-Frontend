export type IUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  dateOfBirth: Date | string;
  photo: string;
  type: string;
  joinDate?: Date;
};

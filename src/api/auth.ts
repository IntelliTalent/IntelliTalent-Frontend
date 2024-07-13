import { BASE_URL, endpoints, publicRequest, userRequest } from "./axios";
import { UserType } from "../enums";
import axios from "axios";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "../constants/api.constant";
import { IUser } from "../types";

interface ICreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  city: string;
  address: string;
  photo: string | null;
  type: UserType;
}

interface IEditUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
  photo?: string;
}

interface IChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export async function signUp(values: ICreateUserDto) {
  await publicRequest.post(endpoints.auth.register, values);
}

export async function signIn(email: string, password: string) {
  const response = await publicRequest.post(endpoints.auth.login, {
    email,
    password,
  });
  return response.data;
}

export async function signOut() {
  const response = await userRequest.post(endpoints.auth.logout);
  return response.data;
}

export async function verifyEmail(token: string) {
  const response = await axios.post(
    endpoints.auth.verifyEmail,
    {},
    {
      baseURL: BASE_URL,
      headers: { [REQUEST_HEADER_AUTH_KEY]: TOKEN_TYPE + token },
    }
  );

  return response.data;
}

export async function forgetPassword(email: string) {
  const response = await publicRequest.post(endpoints.auth.forgetPassword, {
    email,
  });
  return response.data;
}

export async function resetPassword(
  token: string | null | undefined,
  password: string
) {
  const response = await axios.post(
    endpoints.auth.resetPassword,
    {
      password,
    },
    {
      baseURL: BASE_URL,
      headers: { [REQUEST_HEADER_AUTH_KEY]: TOKEN_TYPE + token },
    }
  );

  return response.data;
}

export async function changePassword(data: IChangePasswordDto) {
  const response = await userRequest.patch(endpoints.auth.changePassword, data);
  return response.data;
}

export async function editUser(data: IEditUserDto) {
  const response = await userRequest.patch(endpoints.auth.editUser, data);

  return response.data;
}

export async function getUser(id: string) {
  const response = await userRequest.get(endpoints.auth.getUser(id));

  return {
    id: response.data.id,
    email: response.data.email,
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    phoneNumber: response.data.phoneNumber,
    country: response.data.country,
    city: response.data.city,
    address: response.data.address,
    photo: response.data.photo,
    type: response.data.type,
    joinDate: response.data.joinedAt,
  } as IUser;
}

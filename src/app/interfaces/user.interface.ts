import { Role, http } from "./role.interface";
import {Permission} from './role.permissions.interface'

export interface User {
  id: number;
  password: string;
  email: string;
  name: string;
  lastname: string;
  roleId: number;
  status: boolean;
  createdAt: Date,
  updatedAt: Date,
  Role: Role
}

export interface auth {
  user: User,
  token: string
}

export interface  CreateUserDto extends Omit<User, 'id' | 'Role' | 'createdAt' | 'updatedAt' | 'Permissions'| 'password'> {}

export interface loginDto {
  email: string;
  password: string;
}
export interface  UpdateUserDto extends Partial<CreateUserDto> {}

export interface GetAllUsers extends http {
  data: User[]
}

export interface  GetOneUser extends http {
  data: User,
  token: string;
}

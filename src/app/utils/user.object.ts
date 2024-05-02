import {User} from "../interfaces/user.interface";
import { roleObject } from "./role.object";

export const userObject: User = {
  id: 0,
  name: '',
  lastname: '',
  email: '',
  roleId: 0,
  status: true,
  password: '',
  createdAt: new Date,
  updatedAt: new Date,
  Role: roleObject
}

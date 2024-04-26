import { Role } from "../interfaces/role.interface";

export const roleObject: Role = {
  id: 0,
  name: '',
  status: false,
  createdAt: new Date,
  updatedAt: new Date,
  Permissions: [{
    id: 0,
    roleId: 0,
    accessName: '',
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
    createdAt: new Date,
    updatedAt: new Date
  }]
};

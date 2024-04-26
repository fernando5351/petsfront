import {User} from "../interfaces/user.interface";


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
  Role:  {
    id: 0,
    name: '',
    createdAt: new Date,
    updatedAt: new Date,
    status: true,
    Permissions:[{
      id:0,
      roleId: 0,
      accessName: '',
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
      createdAt: new Date,
      updatedAt: new Date
    }]
  }
}

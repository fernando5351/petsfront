import { Permission } from "./role.permissions.interface";

export interface Role {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  Permissions: [Permission]
}

export interface CreateRol extends  Omit<Role, 'id' | 'Permissions' | 'updatedAt' | 'createdAt' >{};

export interface UpdateRol extends  Partial<CreateRol>{};

export interface http {
  statusCode: number;
  message: string;
}

export interface GetRoles extends http {
  data: Role[];
}

export interface GetRol extends http {
  data: Role;
}

export interface item {
  id: number;
  name: string;
  accessName: string;
  permissions: {
   canCreate: boolean;
   canRead: boolean;
   canUpdate: boolean;
   canDelete: boolean
 }
}

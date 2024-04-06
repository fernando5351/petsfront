export interface Permission {
  id: number;
  roleId: number;
  accessName: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePemission extends Omit<Permission, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdatePermission extends Partial<CreatePemission> {}

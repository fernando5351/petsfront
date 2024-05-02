import { item } from "../interfaces/role.interface";

export const permissionItems: item[] = [
  { id: 0, name: 'Roles', accessName: 'role', permissions: { canCreate: false, getById: false, canRead: false, canUpdate: false, canDelete: false } },
  { id: 0, name: 'Usuarios', accessName: 'user', permissions: { canCreate: false, canRead: false, getById: false, onlyMyRecord: false, canUpdate: false, canDelete: false } },
  { id: 0, name: 'Permisos', accessName: 'permissions', permissions: { canCreate: false, canRead: false, getById: false, canUpdate: false, canDelete: false } },
  { id: 0, name: 'Animales', accessName: 'pet', permissions: { canCreate: false, canRead: false, getById: false, canUpdate: false, canDelete: false } },
  { id: 0, name: 'Direcciones', accessName: 'direction', permissions: { canCreate: false, canRead: false, getById: false, canUpdate: false, canDelete: false } },
  { id: 0, name: 'Dueños', accessName: 'owner', permissions: { canCreate: true, canRead: true, getById: true, canUpdate: true, canDelete: true } },
  { id: 0, name: 'Especies', accessName: 'specie', permissions: { canCreate: false, canRead: false, getById: false, canUpdate: false, canDelete: false } },
];

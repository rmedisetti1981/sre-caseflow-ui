import type {
  Permission,
  User,
} from './types';

export const hasPermission = (
  user: User,
  permission: Permission,
): boolean => {
  return user.permissions.includes(permission);
};
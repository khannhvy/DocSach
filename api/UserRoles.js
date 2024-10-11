// UserRoles.js
export const roles = {
    ADMIN: 'admin',
    NHANVIEN: 'nhanvien',
    USER: 'user',
};

export const permissions = {
    [roles.ADMIN]: ['add', 'edit', 'delete', 'view'],
    [roles.NHANVIEN]: ['add', 'edit', 'view'],
    [roles.USER]: ['view'],
};

export const checkPermission = (userRole, action) => {
    return permissions[userRole]?.includes(action) || false;
};

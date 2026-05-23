export const ADMIN_EMAILS = [
  'sharanrajithk@gmail.com',
  'madhurahegde475@gmail.com',
];

export const SUPER_ADMIN_EMAILS = [
  'sharanrajithk@gmail.com',
  'madhurahegde475@gmail.com',
];

export const isAdminEmail      = (email) => ADMIN_EMAILS.includes(email);
export const isSuperAdminEmail = (email) => SUPER_ADMIN_EMAILS.includes(email);

export default interface IPatchProfile {
  phone?: string;
  password?: { oldPassword: string; newPassword: string };
  email?: string;
}

export default interface IPatchProfile {
  phoneNumber?: string;
  password?: { current: string; new: string };
  email?: string;
}

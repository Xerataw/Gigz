export default interface IPatchProfile {
  phone?: string;
  password?: { current: string; new: string };
  email?: string;
}

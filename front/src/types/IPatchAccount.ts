export default interface IPatchAccount {
  phoneNumber?: string;
  password?: { current: string; new: string };
  email?: string;
}

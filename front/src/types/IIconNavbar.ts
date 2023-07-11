import { ReactNode } from 'react';

export default interface IIconNavbar {
  icon: ReactNode;
  iconFilled: ReactNode;
  fillColor: string;
  label: string;
  path: string;
}

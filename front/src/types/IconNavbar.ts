import { ReactNode } from 'react';

export default interface IconNavbar {
  icon: ReactNode;
  iconFilled: ReactNode;
  fillColor: string;
  label: string;
  path: string;
}

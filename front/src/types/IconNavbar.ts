import { ReactNode } from 'react';
import Icon from './Icon';

export default interface IconNavbar extends Icon {
  path: string;
  fillColor: string;
  iconFilled: ReactNode;
}

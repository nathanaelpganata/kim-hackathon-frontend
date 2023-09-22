import { IconType } from 'react-icons';

export interface NavigationInterface {
  name: string;
  href: string;
  icon: IconType;
  exactMatch?: boolean;
  children?: NavigationInterface[];
}

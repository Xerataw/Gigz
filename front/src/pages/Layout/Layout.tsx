// Types
import { ReactNode } from 'react';

// Sub components
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';

interface ILayoutProps {
  navBarShadow?: boolean;
  children: ReactNode;
}

function Layout({ navBarShadow, children }: ILayoutProps) {
  return (
    <div>
      {children}
      <BottomNavbar isShadow={navBarShadow} />
    </div>
  );
}

export default Layout;

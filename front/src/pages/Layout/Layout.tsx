import { Container } from '@mantine/core';
import BottomNavbar from '../../components/BottomNavbar';

interface ILayoutProps {
  children: React.ReactNode;
  navBarShadow?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, navBarShadow = false }) => {
  return (
    <Container px={0} className="max-h-screen overflow-hidden">
      {children}
      <BottomNavbar isShadow={navBarShadow} />
    </Container>
  );
};

export default Layout;

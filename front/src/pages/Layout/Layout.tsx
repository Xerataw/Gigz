import { Container } from '@mantine/core';
import BottomNavbar from '../../components/BottomNavbar';

interface ILayoutProps {
  children: React.ReactNode;
  navBarShadow?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, navBarShadow = true }) => {
  return (
    <Container px={0} className="max-h-screen overflow-hidden flex flex-col">
      <div className="flex flex-col flex-grow">{children}</div>
      <BottomNavbar isShadow={navBarShadow} />
    </Container>
  );
};

export default Layout;

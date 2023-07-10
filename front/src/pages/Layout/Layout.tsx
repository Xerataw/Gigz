import { Container } from '@mantine/core';
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container px={0} className="max-h-screen overflow-hidden">
      {children}
      <BottomNavbar isShadow />
    </Container>
  );
}

export default Layout;

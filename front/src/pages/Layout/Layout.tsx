import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <BottomNavbar isShadow />
    </div>
  );
}

export default Layout;

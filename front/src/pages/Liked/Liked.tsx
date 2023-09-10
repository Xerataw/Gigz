import Layout from '../Layout/Layout';
import Search from '../Search/Search';

const Liked: React.FC = () => {
  return (
    <Layout>
      <Search isFavorites />
    </Layout>
  );
};

export default Liked;

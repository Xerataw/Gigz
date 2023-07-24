import SerachResultList from '../../components/Search/Result/SearchResultList';
import SearchBar from '../../components/Search/SearchBar';
import Layout from '../Layout/Layout';

const Search: React.FC = () => {
  return (
    <Layout>
      <SearchBar />
      <SerachResultList />
    </Layout>
  );
};

export default Search;

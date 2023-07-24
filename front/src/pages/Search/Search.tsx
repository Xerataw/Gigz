import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import ResultList from '../../components/Search/Result/ResultList';
import SearchBar from '../../components/Search/SearchBar';
import IResult from '../../types/IResult';
import Layout from '../Layout/Layout';
import { getResults } from '../../api/search';
import IGenre from '../../types/IGenre';

const Search: React.FC = () => {
  const loadingData = new Array(20)
    .fill({})
    .map((val, index) => ({ id: index } as IResult));

  const [results, setResults] = useState(loadingData);
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      name: '',
      capacityId: '',
      genres: [] as IGenre[],
    },
  });

  useEffect(() => {
    getProfilesWithFilter();
  }, []);

  const getProfilesWithFilter = () => {
    setLoading(true);
    // TODO working on this
    // getResults(form.values).then((res) => {
    //   setResults(res?.data ?? []);
    //   setLoading(false);
    // });
  };

  return (
    <Layout>
      <SearchBar form={form} />
      <ResultList results={results} loading={loading} />
    </Layout>
  );
};

export default Search;

import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import ResultList from '../../components/Search/Result/ResultList';
import SearchBar from '../../components/Search/SearchBar';
import IResult from '../../types/IResult';
import Layout from '../Layout/Layout';
import { getResults } from '../../api/search';
import IGenre from '../../types/IGenre';
import IFilter from '../../types/IFilter';
import EProfileType from '../../types/EProfileType';

const Search: React.FC = () => {
  const loadingData = new Array(20)
    .fill({})
    .map((val, index) => ({ id: index } as IResult));

  const [results, setResults] = useState(loadingData);
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState(EProfileType.HOST);

  const form = useForm({
    initialValues: {
      name: '',
      capacity: 0,
      genres: [] as IGenre[],
      type: EProfileType.HOST,
    },
  });

  useEffect(() => {
    getProfilesWithFilter();
  }, []);

  const getProfilesWithFilter = () => {
    setLoading(true);
    getResults(form.values as IFilter).then((res) => {
      setResults(res?.data ?? []);
      setLoading(false);
    });
  };

  const onSubmit = (values: any) => {
    getProfilesWithFilter();
    setProfileType(values.type);
  };

  return (
    <Layout>
      <SearchBar form={form} onSubmit={onSubmit} />
      <ResultList
        profileType={profileType}
        results={results}
        loading={loading}
      />
    </Layout>
  );
};

export default Search;

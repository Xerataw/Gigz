import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { getResults } from '../../api/search';
import ResultList from '../../components/Search/Result/ResultList';
import SearchBar from '../../components/Search/SearchBar';
import { useUser } from '../../store/UserProvider';
import EProfileType from '../../types/EProfileType';
import IFilter from '../../types/IFilter';
import IGenre from '../../types/IGenre';
import ILocation from '../../types/ILocation';
import IResult from '../../types/IResult';
import Layout from '../Layout/Layout';

const Search: React.FC = () => {
  const loadingData = new Array(20)
    .fill({})
    .map((val, index) => ({ id: index } as IResult));

  const connectedUser = useUser();
  const userTypeFilter =
    connectedUser.getProfileType() === EProfileType.HOST
      ? EProfileType.ARTIST
      : EProfileType.HOST;
  const [results, setResults] = useState(loadingData);
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState(userTypeFilter);

  const form = useForm({
    initialValues: {
      name: '',
      capacities: [0, 0],
      genres: [] as IGenre[],
      type: userTypeFilter,
      location: {} as ILocation,
    },
  });

  useEffect(() => {
    getProfilesWithFilter();
  }, []);

  const getProfilesWithFilter = () => {
    setLoading(true);
    const filters = { ...form.values };
    // Remove the capacities from the filter when we search for an artsit
    filters.capacities =
      filters.type === EProfileType.HOST
        ? filters.capacities.map((c) => c * 10)
        : [];

    getResults(filters as IFilter).then((res) => {
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

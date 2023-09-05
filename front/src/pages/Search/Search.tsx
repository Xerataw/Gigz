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
import IProfile from '../../types/IProfile';
import IResult from '../../types/IResult';
import Layout from '../Layout/Layout';

const Search: React.FC = () => {
  const loadingData: IResult = {
    artists: new Array(20)
      .fill({})
      .map((val, index) => ({ id: index } as IProfile)),
    isLastPage: false,
  };

  const connectedUser = useUser();
  const userTypeFilter =
    connectedUser.getProfileType() === EProfileType.HOST
      ? EProfileType.ARTIST
      : EProfileType.HOST;
  const [results, setResults] = useState(loadingData);
  const [loading, setLoading] = useState(true);
  const [profileType, setProfileType] = useState(userTypeFilter);
  const [page, setPage] = useState(1);

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

    getResults(getFilters() as IFilter).then((res) => {
      setResults({
        artists: res?.data?.artists ?? [],
        isLastPage: res?.data?.isLastPage,
      } as IResult);
      setLoading(false);
    });
  };

  const onSubmit = (values: any) => {
    getProfilesWithFilter();
    setProfileType(values.type);
  };

  const loadMoreResults = () => {
    setPage((old) => old + 1);
    getResults(getFilters() as IFilter, page).then((res) =>
      setResults(
        (old) =>
          ({
            artists: [...old.artists, ...(res?.data?.artists ?? [])],
            isLastPage: res?.data?.isLastPage,
          } as IResult)
      )
    );
  };

  const getFilters = () => {
    const filters = { ...form.values };
    // Remove the capacities from the filter when we search for an artsit
    filters.capacities =
      filters.type === EProfileType.HOST
        ? filters.capacities.map((c) => c * 10)
        : [];

    return filters;
  };

  return (
    <Layout>
      <SearchBar form={form} onSubmit={onSubmit} />
      <ResultList
        profileType={profileType}
        results={results}
        loading={loading}
        loadMoreResults={loadMoreResults}
      />
    </Layout>
  );
};

export default Search;

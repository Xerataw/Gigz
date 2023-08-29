import { useEffect, useState } from 'react';
import { getAll } from '../../api/favorites';
import ResultList from '../../components/Search/Result/ResultList';
import EProfileType from '../../types/EProfileType';
import IResult from '../../types/IResult';
import Layout from '../Layout/Layout';
import User from '../../types/User';
import { useUser } from '../../store/UserProvider';
import ProfileType from '../../components/Search/Filters/ProfileType';
import { useForm } from '@mantine/form';
import IGenre from '../../types/IGenre';
import ILocation from '../../types/ILocation';
import SearchBar from '../../components/Search/SearchBar';

const Liked: React.FC = () => {
  const user = useUser();
  const [likedProfiles, setLikedProfiles] = useState<IResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfileType, setSelectedProfileType] = useState<EProfileType>(
    user.getProfileType() ?? EProfileType.HOST
  );

  const form = useForm({
    initialValues: {
      name: '',
      capacities: [0, 0],
      genres: [] as IGenre[],
      type: selectedProfileType,
      location: {} as ILocation,
    },
  });

  useEffect(() => {
    getAll().then((res) => {
      console.log(res);
      setLikedProfiles(res.data ?? []);
      setLoading(false);
    });
  }, []);

  const onSubmit = (values: any) => {
    // getProfilesWithFilter();
    // setProfileType(values.type);
  };

  return (
    <Layout>
      <SearchBar form={form} onSubmit={onSubmit} />
      <ResultList
        loading={loading}
        results={likedProfiles}
        profileType={selectedProfileType}
      />
    </Layout>
  );
};

export default Liked;

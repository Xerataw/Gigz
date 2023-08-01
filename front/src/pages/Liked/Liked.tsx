import { Button, Center, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Layout from '../Layout/Layout';

const Liked: React.FC = () => {
  const [favorites, setFavorites] = useState<[]>([]);
  const history = useHistory();

  useEffect(() => {
    setFavorites([]);
  }, []);

  return (
    <Layout>
      {favorites.length <= 0 && (
        <>
          <Title c="dimmed" m="md" order={4} align="center" className="mt-20">
            {t('favorites.none')}
          </Title>

          <Center>
            <Button
              leftIcon={<IconSearch />}
              onClick={() => {
                history.push('/auth/search');
              }}
            >
              {t('favorites.newSearch')}
            </Button>
          </Center>
        </>
      )}

      {favorites.map((fav) => (
        <>test</>
      ))}
    </Layout>
  );
};

export default Liked;

import { ScrollArea, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getResults } from '../../../api/search';
import IResult from '../../../types/IResult';
import ResultProfileDrawer from './ResultProfileDrawer';
import SearchResult from './SearchResult';

const SerachResultList: React.FC = () => {
  const { t } = useTranslation();

  const loadingData = new Array(20)
    .fill({})
    .map((val, index) => ({ id: index } as IResult));
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<IResult[]>(loadingData);
  const [selectedResult, setSelectedResult] = useState<IResult>();

  useEffect(() => {
    getResults().then((res) => {
      setResults(res?.data ?? []);
      setLoading(false);
    });
  }, []);

  const selectResult = (profile: IResult) => {
    setSelectedResult(profile);
  };

  const onModalClose = () => {
    setSelectedResult(undefined);
  };

  return (
    <div>
      <ScrollArea className="h-[40rem]">
        {results.map((result) => (
          <SearchResult
            key={result.id}
            result={result}
            onClick={selectResult}
            loading={loading}
          />
        ))}
        <div className="flex justify-center pb-20 pt-5">
          <Text c="dimmed">{t('search.list.endOfProfiles')}</Text>
        </div>
      </ScrollArea>
      <ResultProfileDrawer
        resultProfile={selectedResult ?? null}
        onClose={onModalClose}
      />
    </div>
  );
};

export default SerachResultList;

import { ScrollArea, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getResults } from '../../../api/search';
import EProfileType from '../../../types/EProfileType';
import IResult from '../../../types/IResult';
import ResultProfileDrawer from './ResultProfileDrawer';
import Result from './Result';

interface IResultListProps {
  results: IResult[];
  loading: boolean;
  profileType: EProfileType;
}

const ResultList: React.FC<IResultListProps> = ({
  results,
  loading,
  profileType,
}) => {
  const { t } = useTranslation();
  const [selectedResult, setSelectedResult] = useState<IResult>();

  const selectResult = (profile: IResult) => {
    setSelectedResult(profile);
  };

  const onModalClose = () => {
    setSelectedResult(undefined);
  };

  return (
    <div>
      <ScrollArea className="h-[40rem] mb-52">
        {results.map((result) => (
          <Result
            key={result.id}
            result={result}
            onClick={selectResult}
            loading={loading}
          />
        ))}
        <div className="flex justify-center pt-5 mb-40">
          {results?.length > 0 ? (
            <Text c="dimmed">{t('search.list.endOfProfiles')}</Text>
          ) : (
            <Text c="dimmed">{t('search.list.noResult')}</Text>
          )}
        </div>
      </ScrollArea>
      <ResultProfileDrawer
        resultProfile={selectedResult ?? null}
        profileType={profileType}
        onClose={onModalClose}
      />
    </div>
  );
};

export default ResultList;

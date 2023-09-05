import { Text } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EProfileType from '../../../types/EProfileType';
import IProfile from '../../../types/IProfile';
import IResult from '../../../types/IResult';
import GigzScrollArea from '../../GigzScrollArea';
import Result from './Result';
import ResultProfileDrawer from './ResultProfileDrawer';

interface IResultListProps {
  results: IResult;
  loading: boolean;
  profileType: EProfileType;
  loadMoreResults?: () => void;
}

const ResultList: React.FC<IResultListProps> = ({
  results,
  loading,
  profileType,
  loadMoreResults,
}) => {
  const { t } = useTranslation();
  const [selectedResult, setSelectedResult] = useState<IProfile>();

  const selectResult = (profile: IProfile) => {
    setSelectedResult(profile);
  };

  const onModalClose = () => {
    setSelectedResult(undefined);
  };

  return (
    <div>
      <GigzScrollArea
        className="h-[40rem] mb-52 w-full"
        onBottomReached={loadMoreResults}
        isLastPage={results.isLastPage}
      >
        <div className="flex flex-col justify-center items-center">
          {results.artists?.length > 0 &&
            results?.artists?.map((result, i) => (
              <Result
                key={i}
                result={result}
                onClick={selectResult}
                loading={loading}
              />
            ))}
          <div className="flex justify-center pt-5 mb-40">
            {results?.artists?.length > 0 ? (
              <Text c="dimmed">{t('search.list.endOfProfiles')}</Text>
            ) : (
              <Text c="dimmed">{t('search.list.noResult')}</Text>
            )}
          </div>
        </div>
      </GigzScrollArea>
      <ResultProfileDrawer
        resultProfile={selectedResult ?? null}
        profileType={profileType}
        onClose={onModalClose}
      />
    </div>
  );
};

export default ResultList;

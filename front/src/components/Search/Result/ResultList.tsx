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
  isFavorites?: boolean;
  loadMoreResults?: () => void;
}

const ResultList: React.FC<IResultListProps> = ({
  results,
  loading,
  profileType,
  isFavorites = false,
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
          {results.profiles?.length > 0 &&
            results?.profiles?.map((result, i) => (
              <Result
                key={i}
                result={result}
                onClick={selectResult}
                loading={loading}
              />
            ))}
          <div className="flex justify-center pt-5 mb-40">
            {results?.profiles?.length > 0 ? (
              <Text c="dimmed">
                {isFavorites
                  ? t('search.list.endOfFavorites')
                  : t('search.list.endOfProfiles')}
              </Text>
            ) : (
              <Text c="dimmed">
                {isFavorites
                  ? t('search.list.noFavorites')
                  : t('search.list.noResult')}
              </Text>
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

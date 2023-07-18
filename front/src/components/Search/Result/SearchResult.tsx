import IResult from '../../../types/IResult';
import ProfileBanner from '../../ProfileView/ProfileBanner';

interface ISearchResultProps {
  result: IResult;
  loading: boolean;
  onClick: (profile: IResult) => void;
}

const SearchResult: React.FC<ISearchResultProps> = ({
  result,
  loading,
  onClick,
}) => {
  return (
    <div onClick={() => !loading && onClick(result)}>
      <ProfileBanner
        username={result?.name ?? ''}
        genres={result?.genres ?? []}
        city={result?.city}
        profilePicture={result?.profilePicture}
        loading={loading}
      />
    </div>
  );
};

export default SearchResult;

import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { deleteLikeAccountById, likeAccountById } from '../../../api/favorites';
import IResult from '../../../types/IResult';
import ProfileBanner from '../../ProfileView/ProfileBanner';

interface ISearchResultProps {
  result: IResult;
  loading: boolean;
  onClick: (profile: IResult) => void;
}

const Result: React.FC<ISearchResultProps> = ({ result, loading, onClick }) => {
  const [isLiked, setIsLiked] = useState(result?.isLiked);

  const likeAccount = () => {
    isLiked ? deleteLikeAccountById(result?.id) : likeAccountById(result?.id);
    setIsLiked((old) => !old);
  };

  return (
    <div className="flex items-center">
      <ProfileBanner
        username={result?.name}
        genres={result?.genres}
        city={result?.city}
        profilePicture={result?.profilePicture}
        loading={loading}
        onClick={() => !loading && onClick(result)}
      />
      <div
        hidden={loading}
        onClick={likeAccount}
        className="pr-5 text-gigz-secondary"
      >
        {isLiked ? (
          <IconHeartFilled size="1.7rem" />
        ) : (
          <IconHeart size="1.7rem" />
        )}
      </div>
    </div>
  );
};

export default Result;

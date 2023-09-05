import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { deleteLikeAccountById, likeAccountById } from '../../../api/favorites';
import IProfile from '../../../types/IProfile';
import ProfileBanner from '../../ProfileView/ProfileBanner';

interface ISearchResultProps {
  result: IProfile;
  loading: boolean;
  onClick: (profile: IProfile) => void;
}

const Result: React.FC<ISearchResultProps> = ({ result, loading, onClick }) => {
  const [isLiked, setIsLiked] = useState(result?.isLiked);

  const likeAccount = () => {
    isLiked
      ? deleteLikeAccountById(result?.accountId)
      : likeAccountById(result?.accountId);
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

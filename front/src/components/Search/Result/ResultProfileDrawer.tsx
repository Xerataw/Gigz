import { Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import IHostProfile from '../../../types/IHostProfile';
import IResult from '../../../types/IResult';
import HostProfileView from '../../ProfileView/HostProfileView';

interface IResultProfileDrawerProps {
  resultProfile: IResult | null;
  onClose: () => void;
}

const ResultProfileDrawer: React.FC<IResultProfileDrawerProps> = ({
  resultProfile,
  onClose,
}) => {
  const [profile, setProfile] = useState<IHostProfile>();

  useEffect(() => {
    if (resultProfile !== null) {
      getProfileFromResult();
    }
  }, [resultProfile]);

  const getProfileFromResult = () => {
    // getProfileByIdAndType()
  };

  return (
    <Drawer opened={resultProfile !== null} position="right" onClose={onClose}>
      <HostProfileView profile={profile!} loading={false} />
    </Drawer>
  );
};

export default ResultProfileDrawer;

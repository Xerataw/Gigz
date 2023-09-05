import { Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getProfileByIdAndType } from '../../../api/search';
import { buildProfile } from '../../../services/apiTypesHelper';
import EProfileType from '../../../types/EProfileType';
import IHostProfile from '../../../types/IHostProfile';
import IProfile from '../../../types/IProfile';
import HostProfileView from '../../ProfileView/HostProfileView';

interface IResultProfileDrawerProps {
  resultProfile: IProfile | null;
  profileType: EProfileType;
  onClose: () => void;
}

const ResultProfileDrawer: React.FC<IResultProfileDrawerProps> = ({
  resultProfile,
  profileType,
  onClose,
}) => {
  const [profile, setProfile] = useState<IHostProfile>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (resultProfile !== null) {
      setLoading(true);
      getProfileByIdAndType(
        resultProfile!.id,
        EProfileType.HOST === profileType
      ).then((res) => {
        setProfile(buildProfile(res?.data as IHostProfile) as IHostProfile);
        setLoading(false);
      });
    }
  }, [resultProfile]);

  return (
    <Drawer
      className="relative bottom-0"
      opened={
        resultProfile !== null && profile !== null && profile !== undefined
      }
      position="right"
      onClose={onClose}
    >
      {profile !== undefined && profile !== null && (
        <HostProfileView profile={profile} loading={loading} />
      )}
    </Drawer>
  );
};

export default ResultProfileDrawer;

import { Button, Group, Modal, Textarea } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageCircle2Filled,
  IconSend,
} from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { createConversation, postMessage } from '../../api/chat';
import { deleteLikeAccountById, likeAccountById } from '../../api/favorites';
import {
  default as IArtistProfile,
  default as IHostProfile,
} from '../../types/IArtistProfile';
import LightRoundButton from '../LightRoundButton';
import Settings from '../Settings/Settings';
import Gallery from './Gallery';
import ProfileDrawer from './ProfileDrawer';
import './profileView.css';

interface IProfileViewProps {
  profile: IArtistProfile | IHostProfile;
  loading: boolean;
  children: ReactNode;
}

const ProfileView: React.FC<IProfileViewProps> = ({
  profile,
  loading,
  children,
}) => {
  const hasMusicEmbed =
    profile &&
    'musicLink' in profile &&
    typeof profile.musicLink === 'string' &&
    profile.musicLink.length > 0;
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(profile?.likedAccount);
  const [newMessageModalOpened, setNewMessageModalOpened] = useState(false);

  const form = useForm({
    initialValues: {
      message: '',
    },
  });

  const likeAccount = () => {
    isLiked
      ? deleteLikeAccountById(profile?.accountId)
      : likeAccountById(profile?.accountId);
    setIsLiked((old) => !old);
  };

  const openConversation = () => {
    if (profile.conversations?.length) {
      history.push('conversations?' + profile?.conversations.at(0)?.id);
    } else {
      setNewMessageModalOpened(true);
    }
  };

  const sendNewMessage = (content: { message: string }) => {
    createConversation(profile.accountId).then((res) => {
      if (res.data?.id !== undefined) {
        const conversationId = res.data?.id;
        postMessage(res.data.id, content.message).then((res) => {
          history.push('conversations?' + conversationId);
        });
      }
      setNewMessageModalOpened(false);
    });
  };

  const canEdit = useLocation().pathname.includes('/auth/profile');

  return (
    <div className="profile-view relative">
      {!canEdit && (
        <div className="absolute z-[5000] p-3 -left-4 -top-[3.5rem]">
          <Group>
            <LightRoundButton
              onClick={likeAccount}
              className="text-gigz-secondary"
            >
              {isLiked ? <IconHeartFilled /> : <IconHeart />}
            </LightRoundButton>
            <LightRoundButton
              onClick={openConversation}
              className="text-gigz-primary"
            >
              {profile?.conversations?.length ? (
                <IconMessageCircle2Filled />
              ) : (
                <IconMessageCircle />
              )}
            </LightRoundButton>
          </Group>
        </div>
      )}
      {canEdit && <Settings />}
      <Gallery
        mediaList={profile?.gallery ?? []}
        loading={loading}
        withEmbed={hasMusicEmbed}
      />
      <ProfileDrawer profile={profile} profileLoading={loading}>
        {children}
      </ProfileDrawer>
      {!canEdit && (
        <Modal.Root
          opened={newMessageModalOpened}
          onClose={() => setNewMessageModalOpened(false)}
          closeOnClickOutside
          centered
        >
          <Modal.Overlay className="opacity-50 blur-s z-[5000]" />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>{'Contacter ' + profile.name}</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <Form
                form={form}
                onSubmit={sendNewMessage}
                className="flex flex-row justify-around items-center"
              >
                <Textarea
                  {...form.getInputProps('message')}
                  data-autofocus
                  label="Message"
                  placeholder="Bonjour, j'aimerais vous contacter pour..."
                  mt="md"
                  className="w-full"
                />
                <Button type="submit" className="mt-10 ml-1">
                  <IconSend />
                </Button>
              </Form>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </div>
  );
};

export default ProfileView;

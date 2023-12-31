import { ActionIcon, Modal, useMantineColorScheme } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconCirclePlus,
  IconPencil,
  IconWorldWww,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import ExternalLinkIcon from '../../ExternalLinkIcon';
import ProfileSection from '../ProfileSections/ProfileSection';
import LinkEditModalContent, { ILinkEdit } from './LinkEditModalContent';

interface ISocialsEditProps {
  instagramLink?: string;
  facebookLink?: string;
  websiteLink?: string;
}

export const iconPencilOrPlus = (
  link: string | undefined,
  isLightTheme: boolean
) => {
  return link ? (
    <IconPencil
      className="pl-[0.05rem]"
      color={isLightTheme ? 'black' : 'white'}
    />
  ) : (
    <IconCirclePlus
      className="pt-[0.1rem]"
      color={isLightTheme ? 'black' : 'white'}
    />
  );
};

export const actionIconClassname = (isLightTheme: boolean) =>
  'absolute -top-3 -right-3 z-10 rounded-full' +
  (isLightTheme ? ' bg-white ' : ' bg-[#25262B] ');

const SocialsEdit: React.FC<ISocialsEditProps> = ({
  instagramLink,
  facebookLink,
  websiteLink,
}) => {
  const isLightTheme = useMantineColorScheme().colorScheme === 'light';

  const { t } = useTranslation();
  const { setEditedInsta, setEditedFacebook, setEditedWebsite } =
    useProfileEdit();
  const [currentInsta, setCurrentInsta] = useState<string | undefined>(
    instagramLink
  );
  const [currentFacebook, setCurrentFacebook] = useState<string | undefined>(
    facebookLink
  );
  const [currentWebsite, setCurrentWebsite] = useState<string | undefined>(
    websiteLink
  );
  const [editLinkModalOpened, setEditLinkModalOpened] =
    useState<boolean>(false);
  const [currentEditedLinkProps, setCurrentEditedLinkProps] =
    useState<ILinkEdit>();

  const openEditionModal = (editedLinkProps: ILinkEdit) => {
    setCurrentEditedLinkProps(editedLinkProps);
    setEditLinkModalOpened(true);
  };

  const closeEditionModal = () => {
    setCurrentEditedLinkProps(undefined);
    setEditLinkModalOpened(false);
  };
  return (
    <>
      <ProfileSection name={t('profile.socials.title')}>
        <ul className="flex flex-flow flex-nowrap justify-start gap-4">
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Instagram',
                  linkLogo: <IconBrandInstagram />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentInsta(newLink);
                    setEditedInsta(newLink);
                  },
                  defaultLink: currentInsta,
                  placeholder: 'https://www.instagram.com/your-profile',
                  regex: RegExp(
                    '(?:https?://)?(?:www\\.)?instagram\\.com/([a-zA-Z0-9_.]+)/?'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentInsta, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={currentInsta}
              logo={<IconBrandInstagram color="white" size="32" />}
              background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
            />
          </li>
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Facebook',
                  linkLogo: <IconBrandFacebook />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentFacebook(newLink);
                    setEditedFacebook(newLink);
                  },
                  defaultLink: currentFacebook,
                  placeholder: 'https://facebook.com/your-profile',
                  regex: RegExp(
                    '(?:https?://)?(?:www\\.)?(?:facebook\\.com|fb\\.com)/([a-zA-Z0-9_.-]+)/?'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentFacebook, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={currentFacebook}
              logo={
                <IconBrandFacebook
                  color="white"
                  size="32"
                  stroke="1.5"
                  className="mr-[1px]"
                />
              }
              background="#4267B2"
            />
          </li>
          <li className="relative">
            <ActionIcon
              className={actionIconClassname(isLightTheme)}
              onClick={() =>
                openEditionModal({
                  linkName: 'Website',
                  linkLogo: <IconWorldWww />,
                  updateLinkFunction: (newLink: string) => {
                    setCurrentWebsite(newLink);
                    setEditedWebsite(newLink);
                  },
                  defaultLink: currentWebsite,
                  placeholder: 'https://your-website.com/',
                  regex: RegExp(
                    '^(?:https?://)?(?:www\\.)?[a-zA-Z0-9.-]+.[a-zA-Z]{2,}(?:/[^s]*)?$'
                  ),
                })
              }
            >
              {iconPencilOrPlus(currentWebsite, isLightTheme)}
            </ActionIcon>
            <ExternalLinkIcon
              link={currentWebsite}
              logo={<IconWorldWww color="white" size="32" stroke="1.5" />}
              background="black"
            />
          </li>
        </ul>
      </ProfileSection>

      <Modal
        opened={editLinkModalOpened}
        onClose={() => closeEditionModal()}
        withCloseButton={false}
        title={t('profile.socials.modalTitle')}
        centered
        styles={{
          overlay: { zIndex: 10000 },
          inner: { zIndex: 100000 },
        }}
        closeOnEscape={false}
      >
        {editLinkModalOpened && (
          <LinkEditModalContent
            linkProps={currentEditedLinkProps as ILinkEdit}
            setModalOpened={setEditLinkModalOpened}
          />
        )}
      </Modal>
    </>
  );
};

export default SocialsEdit;

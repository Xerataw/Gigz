import { Button, Flex, TextInput } from '@mantine/core';
import { t } from 'i18next';
import { useState } from 'react';

export interface ILinkEdit {
  linkName: string;
  linkLogo: JSX.Element;
  defaultLink?: string;
  updateLinkFunction: (updatedLink: string) => void;
  placeholder?: string;
  regex?: RegExp;
}

interface ILinkEditModalContentProps {
  linkProps: ILinkEdit;
  setModalOpened: (opened: boolean) => void;
}

const LinkEditModalContent: React.FC<ILinkEditModalContentProps> = ({
  linkProps: {
    linkName,
    linkLogo,
    defaultLink,
    updateLinkFunction,
    placeholder,
    regex,
  },
  setModalOpened,
}) => {
  const [currentLink, setCurrentLink] = useState<string>(defaultLink ?? '');
  const [currentLinkError, setCurrentLinkError] = useState<string | null>(null);

  const onTextChange = (newText: string) => {
    setCurrentLink(newText);
    setCurrentLinkError(null);
  };

  const onValidateButtonClick = () => {
    if (!currentLink || !regex || regex.test(currentLink)) {
      updateLinkFunction(currentLink);
      setModalOpened(false);
    } else setCurrentLinkError('Invalid link');
  };

  return (
    <>
      <TextInput
        icon={linkLogo}
        label={linkName}
        placeholder={placeholder}
        value={currentLink}
        onChange={(e) => onTextChange(e.currentTarget.value)}
        error={currentLinkError}
      />
      <Flex gap="xs" mt="md">
        <Button onClick={() => onValidateButtonClick()}>
          {t('profile.modal.validate')}
        </Button>
        <Button variant="outline" onClick={() => setModalOpened(false)}>
          {t('profile.modal.cancel')}
        </Button>
      </Flex>
    </>
  );
};

export default LinkEditModalContent;

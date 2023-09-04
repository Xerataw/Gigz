import { TextInput } from '@mantine/core';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const EmbedStep: React.FC<IStepProps> = ({ form }) => {
  const [search, setSearch] = useState<string | undefined>(
    form.getInputProps('embed').value
  );
  const [error, setError] = useState<string | undefined>();

  const handleURL = (url: string) => {
    if (isSpotifyURL(url)) trunckSpotifyURL(url);
  };

  const isSpotifyURL = (url: string) => {
    if (url.includes('https://open.spotify.com/track/')) {
      setError(undefined);
      return true;
    }
    setError(t('register.embedStep.error'));
    setSearch(undefined);
    return false;
  };

  const trunckSpotifyURL = (url: string) => {
    const urlSpotify = new URL(url);
    setSearch(urlSpotify.pathname.split('/track/')[1]);
  };

  useEffect(() => {
    form.setFieldValue('embed', search);
  }, [search]);
  return (
    <>
      <StepTitle label={t('register.embedStep.label')} />

      <TextInput
        autoFocus
        mt="sm"
        mb="md"
        pb="md"
        error={error}
        label={
          <Helper.Label label={t('register.embedStep.helper')}>
            {t('register.embedStep.embed')}
          </Helper.Label>
        }
        placeholder="https://open.spotify.com/track/ID"
        onChange={(value) => handleURL(value.target.value)}
      />
      {search && (
        <iframe
          style={{ borderRadius: 12 }}
          src={
            'https://open.spotify.com/embed/track/' +
            search +
            '?utm_source=generator'
          }
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </>
  );
};

export default EmbedStep;

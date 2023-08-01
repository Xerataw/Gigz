import { ActionIcon, Chip, TextInput, ThemeIcon } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { t } from 'i18next';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

interface ISocialLinksStep extends IStepProps {
  links: {
    label: string;
    placeholder: string;
    value: string;
    color: string;
    icon: JSX.Element;
  }[];
}

const SocialLinksStep: React.FC<ISocialLinksStep> = ({ form, links }) => {
  return (
    <>
      <StepTitle label={t('register.socialLinksStep.label')} />

      <Helper.UnderTitle label={t('register.socialLinksStep.helper')}>
        {t('register.socialLinksStep.links')}
      </Helper.UnderTitle>
      <Chip.Group>
        {links.map((link) => (
          <div className="my-3" key={link.value}>
            <TextInput
              {...form.getInputProps(link.value)}
              placeholder={link.placeholder}
              icon={
                <ThemeIcon color={link.color} radius="xl" className="w-8 h-8">
                  {link.icon}
                </ThemeIcon>
              }
              rightSection={
                <ActionIcon
                  radius="xl"
                  color="dark"
                  onClick={() => {
                    window.open(form.values[link.value], '_blank');
                  }}
                  disabled={form.values[link.value].length <= 0}
                >
                  <IconExternalLink />
                </ActionIcon>
              }
              radius="xl"
              styles={(theme) => ({
                input: {
                  '&:focus-within': {
                    borderColor: theme.colors[link.color][7],
                    borderWidth: 2,
                  },
                },
              })}
            />
          </div>
        ))}
      </Chip.Group>
    </>
  );
};

export default SocialLinksStep;

// Sub components
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconWorldWww,
} from '@tabler/icons-react';
import ExternalLinkIcon from '../../../Icon/ExternalLinkIcon';
import ProfileSection from './ProfileSection';

interface ISocialsProps {
  instagramLink?: string;
  facebookLink?: string;
  websiteLink?: string;
}

const Socials: React.FC<ISocialsProps> = ({
  instagramLink,
  facebookLink,
  websiteLink,
}) => {
  return (
    <ProfileSection name="Retrouvez-moi ici">
      <ul className="flex flex-flow flex-nowrap justify-start mt-3 gap-4">
        {instagramLink && (
          <li>
            <ExternalLinkIcon
              link={instagramLink}
              logo={<IconBrandInstagram color="white" size="32" />}
              background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
            />
          </li>
        )}
        {facebookLink && (
          <li>
            <ExternalLinkIcon
              link={facebookLink}
              logo={
                <IconBrandFacebook
                  color="white"
                  size="32"
                  stroke="1.5"
                  style={{
                    marginRight: '1px',
                  }}
                />
              }
              background="#4267B2"
            />
          </li>
        )}
        {websiteLink && (
          <li>
            <ExternalLinkIcon
              link={websiteLink}
              logo={<IconWorldWww color="white" size="32" stroke="1.5" />}
              background="black"
            />
          </li>
        )}
      </ul>
    </ProfileSection>
  );
};

export default Socials;

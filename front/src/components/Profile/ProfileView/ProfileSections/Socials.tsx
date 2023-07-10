// Sub components
import ProfileSection from './ProfileSection';
import SocialMediaCard from './SocialMediaCard/SocialMediaCard';
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconWorldWww,
} from '@tabler/icons-react';

export interface ISocialsProps {
  instagramLink?: string;
  facebookLink?: string;
  websiteLink?: string;
}

export default function Socials({
  instagramLink,
  facebookLink,
  websiteLink,
}: ISocialsProps) {
  return (
    <ProfileSection name="Retrouvez-moi ici">
      <ul className="flex flex-flow flex-nowrap justify-start mt-3 gap-4">
        {instagramLink && (
          <li>
            <SocialMediaCard
              link={instagramLink}
              logo={<IconBrandInstagram color="white" size="32" />}
              background="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
            />
          </li>
        )}
        {facebookLink && (
          <li>
            <SocialMediaCard
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
            <SocialMediaCard
              link={websiteLink}
              logo={<IconWorldWww color="white" size="32" stroke="1.5" />}
              background="black"
            />
          </li>
        )}
      </ul>
    </ProfileSection>
  );
}

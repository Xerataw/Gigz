// Sub components
import ProfileSection from './ProfileSection';
import SocialMediaCard from './SocialMediaCard/SocialMediaCard';
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
} from '@tabler/icons-react';

export interface ISocialsProps {
  instagramLink?: string;
  facebookLink?: string;
  twitterLink?: string;
}

export default function Socials({
  instagramLink,
  facebookLink,
  twitterLink,
}: ISocialsProps) {
  return (
    <ProfileSection name="Réseaux sociaux">
      <ul className="flex flex-flow flex-nowrap items-center justify-evenly mt-3">
        {instagramLink && (
          <li>
            <SocialMediaCard
              link={instagramLink}
              logo={<IconBrandInstagram size="36" stroke="1.75" />}
            />
          </li>
        )}
        {facebookLink && (
          <li>
            <SocialMediaCard
              link={facebookLink}
              logo={<IconBrandFacebook size="36" stroke="1.75" />}
            />
          </li>
        )}
        {twitterLink && (
          <li>
            <SocialMediaCard
              link={twitterLink}
              logo={<IconBrandTwitter size="36" stroke="1.75" />}
            />
          </li>
        )}
      </ul>
    </ProfileSection>
  );
}

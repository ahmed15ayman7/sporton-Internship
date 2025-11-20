import { User } from '@sporton/interfaces';

export interface Invitation {
  id: string;
  user: User;
  jobTitle?: string;
}

export interface NetworkItem {
  id: string;
  title: string;
  count: number;
  icon: React.ReactNode;
}

export interface UserCardProps {
  user: User;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  onButtonClick?: () => void;
  className?: string;
}

export interface PremiumCardProps {
  onTryPremium?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export interface InvitationListProps {
  invitations: Invitation[];
  onAccept?: (invitationId: string) => void;
  onIgnore?: (invitationId: string) => void;
  onSeeAll?: () => void;
  className?: string;
}

export interface PeopleYouMayKnowProps {
  people: User[];
  onConnect?: (userId: string) => void;
  onSeeAll?: () => void;
  className?: string;
}

export interface PagesToFollowProps {
  pages: User[];
  onFollow?: (pageId: string) => void;
  onSeeAll?: () => void;
  className?: string;
}

export interface ManageNetworkProps {
  items: NetworkItem[];
  onItemClick?: (itemId: string) => void;
  onSeeAllRecommendations?: () => void;
  className?: string;
}

export interface ManageMyNetworkProps {
  className?: string;
}


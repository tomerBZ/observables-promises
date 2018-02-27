import { Follower } from './follower';

export interface FollowersResponse {
  followers: Follower[];
  is_more: boolean;
  next_page: string;
}

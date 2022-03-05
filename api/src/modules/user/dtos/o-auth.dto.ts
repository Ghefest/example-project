import { Device } from '../../../common/functions/get-device-from-req';

export class OAuthDTO {
  username: string;
  avatar: string;
  steamId64: string;
  ip: string;
  device: Device;
  referralCode?: string;
}

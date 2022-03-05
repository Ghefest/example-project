import { Request } from 'express';
import * as device from 'device';

export type Device = 'desktop' | 'tv' | 'tablet' | 'phone' | 'bot' | 'car' | 'console';

function getDeviceFromReq(req: Request): Device {
  const userAgent = req.headers['user-agent'];

  if (!userAgent || userAgent === '') {
    if (req.headers['cloudfront-is-mobile-viewer'] === 'true') return 'phone';
    if (req.headers['cloudfront-is-tablet-viewer'] === 'true') return 'tablet';
    if (req.headers['cloudfront-is-desktop-viewer'] === 'true') return 'desktop';

    return 'desktop';
  }

  return device(userAgent).type;
}

export { getDeviceFromReq };

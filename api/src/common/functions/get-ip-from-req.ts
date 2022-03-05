import { Request } from 'express';

function getIpFromReq(req: Request) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return Array.isArray(ip) ? ip[0] : ip;
}

export { getIpFromReq };

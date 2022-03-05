export default () => ({
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  sessionCookieName: process.env.SESSION_COOKIE_NAME || 'sessionId',

  langCookieName: process.env.LANG_COOKIE_NAME || 'lang',
  fallbackLang: process.env.FALLBACK_LANG || 'ru',

  appProtocol: process.env.APP_PROTOCOL || 'http',
  appHost: process.env.APP_HOST || 'localhost',
  appPort: parseInt(process.env.APP_PORT, 10) || 3000,
  appDomain: process.env.APP_DOMAIN || null,

  siteUrl: process.env.SITE_URL,

  geoIp: {
    accountID: process.env.GEO_IP_ACCOUNT_ID,
    licenseKey: process.env.GEO_IP_LICENSE_KEY,
    options: {
      host: process.env.GEO_IP_OPTIONS_HOST,
    },
  },

  mineExchange: {
    apiKey: process.env.MINE_EXCHANGE_API_KEY,
  },

  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE,
    entities: [process.env.DB_ENTITIES],
    synchronize: Boolean(process.env.DB_SYNCHRONIZE) || true,
  },

  socketIo: {
    redis: {
      host: process.env.SOCKET_IO_REDIS_HOST || 'localhost',
      port: Number(process.env.SOCKET_IO_REDIS_PORT) || 6379,
    },
  },

  bull: {
    limiter: {
      max: Number(process.env.BULL_LIMITER_MAX) || 1,
      duration: Number(process.env.BULL_LIMITER_DURATION) || 30000,
    },
    redis: {
      host: process.env.BULL_REDIS_HOST || 'localhost',
      port: Number(process.env.BULL_REDIS_PORT) || 6379,
    },
  },
  steamApiKey: process.env.STEAM_API_KEY,
  openExchangeRatesAppId: process.env.OPEN_EXCHANGE_RATES_APP_ID,
  imgBBApiKey: process.env.IMG_BB_API_KEY,
});

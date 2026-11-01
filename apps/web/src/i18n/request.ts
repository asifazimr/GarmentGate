import { getRequestConfig } from 'next-intl/server';
import en from '../../messages/en.json';

export const DEFAULT_LOCALE = 'en';

// One locale for now. Adding one = a messages file plus picking the locale here
// (from the user's profile or a cookie).
export default getRequestConfig(() =>
  Promise.resolve({
    locale: DEFAULT_LOCALE,
    messages: en,
    timeZone: 'UTC',
  }),
);

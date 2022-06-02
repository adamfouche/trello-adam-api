import { WHITELIST_DOMAINS } from '~/utils/constants'
export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAINS.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} Not allowed by CORS`))
    }
  },
  optionsSuccessStatus: 200
}

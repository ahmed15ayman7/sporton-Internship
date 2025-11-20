import en from './en.json'
import ar from './ar.json'
import arCommon from './ar/common.json'
import enCommon from './en/common.json'
import arHome from './ar/home.json'
import enHome from './en/home.json'
import arConections from "./ar/conections.json"
import enConections from "./en/conections.json"
import arLanding from "./ar/landing.json"
import enLanding from "./en/landing.json"
import arAuth from "./ar/auth.json"
import enAuth from "./en/auth.json"
import arPricing from "./ar/pricing.json"
import enPricing from "./en/pricing.json"
import arNotifications from "./ar/notifications.json"
import enNotifications from "./en/notifications.json"
import arStore from "./ar/store.json"
import enStore from "./en/store.json"
import enProfile from "./en/profile.json"
import arProfile from "./ar/profile.json"
import arChat from "./ar/chat.json"
import enChat from "./en/chat.json"
import arSettings from "./ar/settings.json"
import enSettings from "./en/settings.json"




export const messages = {
    en: {
        ...en,
        ...enHome,
        ...enConections,
        ...enLanding,
        ...enAuth,
        ...enPricing,
        ...enNotifications,
        ...enStore,
        ...enProfile,
        ...enCommon,
        ...enChat,
        ...enSettings
    },
    ar: {
        ...ar,
        ...arHome,
        ...arConections,
        ...arLanding,
        ...arAuth,
        ...arPricing,
        ...arNotifications,
        ...arStore,
        ...arProfile,
        ...arCommon,
        ...arChat,
        ...arSettings
    },
}
export { sports, positions, checkProfane } from './constants'
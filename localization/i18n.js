import * as Localization from "expo-localization";
import i18n from "i18n-js";

// Import locales
import * as enL from "./translations/en.json";
import * as esL from "./translations/es.json";
import * as frL from "./translations/fr.json";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: enL,
  es: esL,
  fr: frL,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;

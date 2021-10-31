import i18n from "i18n-js";
import { isrealHebrew } from "./he-il";
export { tokens } from "./tokens";

i18n.translations = {
  en: isrealHebrew,
  ["en-US"]: isrealHebrew,
};

i18n.fallbacks = true;

export default i18n;

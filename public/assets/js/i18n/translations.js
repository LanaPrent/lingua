import { uiTranslations } from "./translations_ui.js";
import { contentTranslations } from "./translations_content.js";
import { homeTranslations } from "./translations_home.js";
import { exerciseTranslations } from "./translations_exercises.js";
//import { messages } from "./translations_messages.js";

export const translations = {
    en: {
        ...uiTranslations.en,
        ...contentTranslations.en,
        ...homeTranslations.en,
        ...exerciseTranslations.en,
     //   ...messages.en
        
    
    },

    sr: {
        ...uiTranslations.sr,
        ...contentTranslations.sr,
        ...homeTranslations.sr,
        ...exerciseTranslations.sr,
    //  ...messages.sr
    }
};

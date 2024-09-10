import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import French from "./fr.json";
import English from "./en.json";
import Japanese from "./jp.json";
import Russian from "./ru.json";

export const LanguageContext = React.createContext();

const loc = "en";

let lang;
if (loc === "fr") {
  lang = French;
} else if (loc === "en") {
  lang = English;
} else if (loc === "jp") {
  lang = Japanese;
} else if (loc === "ru") {
  lang = Russian;
}

const Wrapper = (props) => {
  const [locale, setLocale] = useState(loc);
  const [messages, setMessages] = useState(lang);

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    switch (newLocale) {
      case "fr":
        setMessages(French);
        break;
      case "en":
        setMessages(English);
        break;
      case "jp":
        setMessages(Japanese);
        break;
      case "ru":
        setMessages(Russian);
        break;
      default:
        break;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        changeLanguage,
      }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default Wrapper;

import React, { useState, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import French from "./fr.json";
import English from "./en.json";
import Japanese from "./jp.json";
import Russian from "./ru.json";

type Locale = "fr" | "en" | "jp" | "ru";
type Messages = typeof French | typeof English | typeof Japanese | typeof Russian;

interface LanguageContextType {
  locale: Locale;
  changeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

const locales: Record<Locale, Messages> = {
  fr: French,
  en: English,
  jp: Japanese,
  ru: Russian
};

const defaultLocale: Locale = "en";

interface LanguageWrapperProps {
  children: ReactNode;
}

const LanguageWrapper: React.FC<LanguageWrapperProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages>(locales[defaultLocale]);

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    setLocale(newLocale);
    setMessages(locales[newLocale]);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        changeLanguage
      }}
    >
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageWrapper;
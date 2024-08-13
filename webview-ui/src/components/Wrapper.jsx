import React, {useState} from 'react';
import { IntlProvider } from 'react-intl';
import French from '../lang/fr.json';
import English from '../lang/en.json';

export const LanguageContext = React.createContext();

// const loc = navigator.language || 'fr';
const loc = 'fr';

let lang
if (loc === 'fr') {
    lang = French;
}
else {
    lang = English;
}

const Wrapper = (props) => {
    const [locale, setLocale] = useState(loc);
    const [messages, setMessages] = useState(lang);

    const changeLanguage = (e) => {
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (newLocale === 'fr') {
            setMessages(French);
        } else {
            setMessages(English);
        }
    }

    return (
        <LanguageContext.Provider
            value={{
                locale,
                changeLanguage
            }}
        >
        <IntlProvider messages={messages} locale={locale}>
            {props.children}
        </IntlProvider>
        </LanguageContext.Provider>

    );
}

export default Wrapper;
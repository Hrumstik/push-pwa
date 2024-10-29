import React, { ReactNode, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

type LocaleMessages = {
  [key: string]: string;
};

interface LocaleProviderProps {
  children: ReactNode;
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const userLocale = navigator.language;
  const [messages, setMessages] = useState<LocaleMessages>({});

  useEffect(() => {
    const loadLocaleData = async (locale: string): Promise<void> => {
      let localeData;
      switch (locale.split("-")[0]) {
        case "en":
        case "ie":
          localeData = await import("./Locales/English.json");
          break;
        case "fr":
          localeData = await import("./Locales/French.json");
          break;
        case "nl":
          localeData = await import("./Locales/Dutch.json");
          break;
        case "de":
        case "at":
        case "ch":
        case "au":
          localeData = await import("./Locales/German.json");
          break;
        case "es":
          localeData = await import("./Locales/Spanish.json");
          break;
        case "it":
          localeData = await import("./Locales/Italian.json");
          break;
        case "pl":
          localeData = await import("./Locales/Polish.json");
          break;
        case "br":
        case "pt":
          localeData = await import("./Locales/Portuguese.json");
          break;
        case "dk":
          localeData = await import("./Locales/Danish.json");
          break;
        default:
          localeData = await import("./Locales/English.json");
      }
      setMessages(localeData.default);
    };

    loadLocaleData(userLocale);
  }, [userLocale]);

  return (
    <IntlProvider locale={userLocale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;

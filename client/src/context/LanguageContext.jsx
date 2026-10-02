import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      contact: "Contact",
      cart: "Cart",
      adminPanel: "Admin Panel",
      welcomeAdmin: "Welcome admin, you can do whatever you want",
      welcomeUser: "Welcome",
    },
    home: {
      title: "Agasy's Shop",
      subtitle: "Explore top smartphones, electronics, and gadgets at Agasy's Shop. Find deals on Samsung, iPhone, Xiaomi, and more.",
      ctaButton: "Click here to go to products page",
    },
    products: {
      filterDefault: "default",
      filterIncreases: "Price increases",
      filterDecreases: "Price decreases",
      searchPlaceholder: "Search",
      noData: "There is no data now",
      showMore: "Show More",
    },
    single: {
      addToCart: "Add to Cart",
      specifications: "Specifications",
      chipset: "Chipset:",
      displaySize: "Display Size:",
      camera: "Camera:",
      storage: "Storage:",
      memory: "Memory:",
    },
    cart: {
      empty: "There are no cart items now",
    },
    contact: {
      title: "Contact Us",
      desc: "For inquiries, reach out to us directly.",
    },
    footer: {
      designedBy: "Designed by Aghasi",
    },
    lang: {
      en: "EN",
      hy: "ՀԱՅ",
    },
  },
  hy: {
    nav: {
      home: "Գլխավոր",
      products: "Ապրանքներ",
      contact: "Կապ",
      cart: "Զամբյուղ",
      adminPanel: "Ադմին վահանակ",
      welcomeAdmin: "Բարի գալուստ ադմին",
      welcomeUser: "Բարի գալուստ",
    },
    home: {
      title: "Աղասիի Խանութ",
      subtitle: "Բացահայտեք լավագույն սմարթֆոնները, էլեկտրոնիկան և սարքավորումները: Գտեք լավագույն առաջարկները Samsung, iPhone, Xiaomi և այլ բրենդների համար:",
      ctaButton: "Անցնել ապրանքների էջ",
    },
    products: {
      filterDefault: "լռելյայն",
      filterIncreases: "Գնի աճման կարգով",
      filterDecreases: "Գնի նվազման կարգով",
      searchPlaceholder: "Որոնել",
      noData: "Ապրանքներ առկա չեն",
      showMore: "Դիտել ավելին",
    },
    single: {
      addToCart: "Ավելացնել զամբյուղ",
      specifications: "Բնութագիր",
      chipset: "Պրոցեսոր (Chipset):",
      displaySize: "Էկրանի չափս:",
      camera: "Տեսախցիկ:",
      storage: "Հիշողություն:",
      memory: "Օպերատիվ (RAM):",
    },
    cart: {
      empty: "Զամբյուղում ապրանքներ չկան",
    },
    contact: {
      title: "Կապ մեզ հետ",
      desc: "Հարցերի դեպքում կարող եք կապ հաստատել մեզ հետ:",
    },
    footer: {
      designedBy: "Պատրաստված է Աղասիի կողմից",
    },
    lang: {
      en: "EN",
      hy: "ՀԱՅ",
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('site_lang') || 'hy';
  });

  useEffect(() => {
    localStorage.setItem('site_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'hy' ? 'en' : 'hy'));
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English if translation key missing
        let fallback = translations.en;
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) return keyPath;
          fallback = fallback[fKey];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

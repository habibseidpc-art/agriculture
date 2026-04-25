import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    welcomeBack: "Welcome Back",
    createAccount: "Create Account",
    phoneNumber: "Phone Number",
    password: "Password",
    login: "Login",
    register: "Register",
    fullName: "Full Name",
    location: "Location",
    role: "Role",
    farmer: "Farmer",
    extensionOfficer: "Extension Officer",
    farmType: "Farm Type",
    submitRequest: "Submit Request",
    requestHistory: "Request History",
    dashboard: "Dashboard",
    allRequests: "All Requests",
    logout: "Logout",
    cropType: "Crop Type",
    problemDesc: "Problem Description",
    farmSize: "Farm Size (Hectares)",
    submitProblem: "Submit Problem",
    advice: "Advice",
    fertilizer: "Fertilizer",
    pestControl: "Pest Control",
    status: "Status",
    systemOverview: "System Overview",
    totalFarmers: "Total Farmers",
    activeRequests: "Active Requests",
    solvedCases: "Solved Cases",
    noRequests: "You haven't submitted any requests yet.",
    provideAdvice: "Provide Advisory",
    empowering: "Empowering Modern Agriculture",
    joinFuture: "Join The Future of Farming",
    placeholderPhone: "+251 900 000 000",
    placeholderCrop: "e.g. Teff, Coffee, Wheat, Maize",
    placeholderLocation: "e.g. Addis Ababa, Oromia, Amhara"
  },
  am: {
    welcomeBack: "እንኳን ደህና መጡ",
    createAccount: "አካውንት ይፍጠሩ",
    phoneNumber: "ስልክ ቁጥር",
    password: "የይለፍ ቃል",
    login: "ግባ",
    register: "ተመዝገብ",
    fullName: "ሙሉ ስም",
    location: "አካባቢ",
    role: "ሚና",
    farmer: "ገበሬ",
    extensionOfficer: "የግብርና ባለሙያ",
    farmType: "የእርሻ አይነት",
    submitRequest: "ጥያቄ አቅርብ",
    requestHistory: "የጥያቄ ታሪክ",
    dashboard: "ዳሽቦርድ",
    allRequests: "ሁሉም ጥያቄዎች",
    logout: "ውጣ",
    cropType: "የሰብል አይነት",
    problemDesc: "የችግሩ መግለጫ",
    farmSize: "የእርሻ መጠን (በሄክታር)",
    submitProblem: "ችግሩን ላክ",
    advice: "ምክር",
    fertilizer: "ማዳበሪያ",
    pestControl: "የተባይ መቆጣጠሪያ",
    status: "ሁኔታ",
    systemOverview: "ስርዓት አጠቃላይ እይታ",
    totalFarmers: "አጠቃላይ ገበሬዎች",
    activeRequests: "ንቁ ጥያቄዎች",
    solvedCases: "የተፈቱ ጉዳዮች",
    noRequests: "እስካሁን ምንም ጥያቄ አላቀረቡም።",
    provideAdvice: "ምክር ይስጡ",
    empowering: "ዘመናዊ ግብርናን ማበረታታት",
    joinFuture: "የግብርናውን የወደፊት ጊዜ ይቀላቀሉ",
    placeholderPhone: "+251 900 000 000",
    placeholderCrop: "ለምሳሌ ጤፍ፣ ቡና፣ ስንዴ፣ በቆሎ",
    placeholderLocation: "ለምሳሌ አዲስ አበባ፣ ኦሮሚያ፣ አማራ"
  },
  om: {
    welcomeBack: "Baga Nagaan Deebitan",
    createAccount: "Herrega Uumi",
    phoneNumber: "Lakk. Bilbilaa",
    password: "Iccitii",
    login: "Seeni",
    register: "Galmoofadhu",
    fullName: "Maqaa Guutuu",
    location: "Bakka Jireenyaa",
    role: "Gahee",
    farmer: "Qotee Bulaa",
    extensionOfficer: "Ogeessa Qonnaa",
    farmType: "Gosa Qonnaa",
    submitRequest: "Gaaffii Dhiyeessi",
    requestHistory: "Seenaa Gaaffii",
    dashboard: "Daashboordii",
    allRequests: "Gaaffilee Hunda",
    logout: "Bahi",
    cropType: "Gosa Midhaanii",
    problemDesc: "Ibsa Rakkoo",
    farmSize: "Bal'ina Lafa (Hektaaraan)",
    submitProblem: "Rakkoo Ergi",
    advice: "Gorsa",
    fertilizer: "Xaa'oo",
    pestControl: "Qoricha Ilbiisotaa",
    status: "Haala",
    systemOverview: "Ilaalcha Waligalaa",
    totalFarmers: "Qotee Bultoota Hunda",
    activeRequests: "Gaaffilee Ammaa",
    solvedCases: "Rakkoo Furame",
    noRequests: "Hanga ammaatti gaaffii hin dhiyeessine.",
    provideAdvice: "Gorsa Kenni",
    empowering: "Qonna Ammayyaa Cimsuu",
    joinFuture: "Hirmaadhu Gara Fuulduraa Qonnaa",
    placeholderPhone: "+251 900 000 000",
    placeholderCrop: "Fkn. Xaafii, Buna, Qamadii, Boqqolloo",
    placeholderLocation: "Fkn. Finfinnee, Oromiyaa, Amaaraa"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

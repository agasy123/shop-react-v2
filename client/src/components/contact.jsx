import React from 'react';
import { useTranslation } from "../context/LanguageContext";

function Contact(){
    const { t } = useTranslation();
    return(
        <div className="main" style={{ textAlign: "center" }}>
            <h1>{t("contact.title")}</h1>
            <p style={{ marginTop: "16px", fontSize: "1.1rem", color: "#4a4a6a" }}>
                {t("contact.desc")}
            </p>
        </div>
    )
}

export default Contact;

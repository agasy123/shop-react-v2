import React from 'react';
import { useTranslation } from "../context/LanguageContext";

function Footer(params) {
    const { t } = useTranslation();
    return(
        <footer>
		    <nav>
			    <ul>
				    <li id="footli">{t("footer.designedBy")}</li>
			    </ul>
		    </nav>
	    </footer>
    )
}

export default Footer;

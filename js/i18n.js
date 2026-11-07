const DEFAULT_LANGUAGE = "es";
const SUPPORTED_LANGUAGES = ["es", "en"];

let currentLanguage = DEFAULT_LANGUAGE;
let translations = {};

function getTranslationValue(object, path) {
    return path.split(".").reduce((value, key) => {
        return value && value[key] !== undefined
            ? value[key]
            : undefined;
    }, object);
}

async function loadTranslations(language) {
    const response = await fetch(`./assets/i18n/${language}.json`);

    if (!response.ok) {
        throw new Error(`No se pudo cargar el idioma: ${language}`);
    }

    return response.json();
}

function updatePageTexts() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translatedText = getTranslationValue(translations, key);

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const key = element.dataset.i18nHtml;
        const translatedText = getTranslationValue(translations, key);

        if (translatedText !== undefined) {
            element.innerHTML = translatedText;
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const key = element.dataset.i18nAriaLabel;
        const translatedText = getTranslationValue(translations, key);

        if (translatedText !== undefined) {
            element.setAttribute("aria-label", translatedText);
        }
    });

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-lang]").forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.lang === currentLanguage
        );
    });
}

async function setLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
        language = DEFAULT_LANGUAGE;
    }

    try {
        translations = await loadTranslations(language);
        currentLanguage = language;

        localStorage.setItem("rumbo-language", language);

        updatePageTexts();
    } catch (error) {
        console.error(error);

        if (language !== DEFAULT_LANGUAGE) {
            await setLanguage(DEFAULT_LANGUAGE);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("rumbo-language");

    const initialLanguage =
        SUPPORTED_LANGUAGES.includes(savedLanguage)
            ? savedLanguage
            : DEFAULT_LANGUAGE;

    document.querySelectorAll("[data-lang]").forEach((button) => {
        button.addEventListener("click", () => {
            setLanguage(button.dataset.lang);
        });
    });

    setLanguage(initialLanguage);
});
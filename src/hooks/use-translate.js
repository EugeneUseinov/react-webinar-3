import {useCallback, useState, useMemo, useLayoutEffect} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const services = useServices()
  const [locale, setLocale] = useState(services.i18n.lang);
  const setLang = useCallback(locale => services.i18n.setLang(locale), []);
  const t = useCallback((text, number) => services.i18n.translate(locale, text, number), [services.i18n.lang]);
  const unsubscribe = useMemo(() => {
    return services.i18n.subscribe((locale) => {
      setLocale(locale);
    });
  }, []);
  useLayoutEffect(() => unsubscribe, [unsubscribe]);
  return {locale, setLang, t};
}

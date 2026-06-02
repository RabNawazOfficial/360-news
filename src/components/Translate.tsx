import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TranslateProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export const Translate: React.FC<TranslateProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { language, translateText } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (language === 'en' || !children.trim()) {
      setTranslatedText(children);
      setLoading(false);
      return;
    }

    setLoading(true);
    translateText(children, language)
      .then((result) => {
        if (isMounted) {
          setTranslatedText(result);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTranslatedText(children);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [children, language, translateText]);

  if (loading) {
    return (
      <Component className={`${className} animate-pulse bg-white/10 text-transparent rounded select-none inline`}>
        {children}
      </Component>
    );
  }

  return <Component className={className}>{translatedText}</Component>;
};

export default Translate;

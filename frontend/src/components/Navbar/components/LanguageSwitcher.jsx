import React, { useTransition } from 'react';
import i18n from '../i18n';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (lng) => {
    startTransition(() => {
      i18n.changeLanguage(lng);
    });
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => changeLanguage('en')} disabled={isPending}>
        {isPending ? 'Loading…' : 'English'}
      </button>
      <button onClick={() => changeLanguage('vi')} disabled={isPending}>
        {isPending ? 'Đang tải…' : 'Tiếng Việt'}
      </button>
    </div>
  );
}
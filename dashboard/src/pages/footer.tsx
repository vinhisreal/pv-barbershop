/* eslint-disable import/no-unresolved */
import { CONFIG } from 'src/config-global';

import { FooterView } from 'src/sections/footer/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Footers - ${CONFIG.appName}`}</title>

      <FooterView />
    </>
  );
}

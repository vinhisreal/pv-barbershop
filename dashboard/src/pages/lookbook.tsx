/* eslint-disable import/no-unresolved */
import { CONFIG } from 'src/config-global';

import { LookbookView } from 'src/sections/lookbook/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Lookbooks - ${CONFIG.appName}`}</title>

      <LookbookView />
    </>
  );
}

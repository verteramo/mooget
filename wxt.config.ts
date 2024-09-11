/*******************************************************************************
 * wxt.config.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

import { defineConfig } from 'wxt'

const permissions = [
  'activeTab',
  'storage',
  'unlimitedStorage',
  'webRequest'
]

const manifest: Record<string, any> = {
  chrome: {
    permissions: [...permissions, 'sidePanel']
  },

  firefox: {
    permissions,
    browser_specific_settings: {
      gecko: {
        id: `{${globalThis.crypto.randomUUID()}}`
      }
    }
  }
}

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  srcDir: 'src',
  runner: { disabled: true },
  manifest: ({ browser }) => ({
    name: 'Mooget',
    ...manifest[browser]
  })
})

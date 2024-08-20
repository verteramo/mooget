/*******************************************************************************
 * wxt.config.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

// External dependencies
import { defineConfig } from 'wxt'

const permissions = [
  'tabs',
  'storage',
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
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  runner: { disabled: true },
  manifest: ({ browser }) => ({
    name: 'Mooget',
    ...manifest[browser]
  })
})

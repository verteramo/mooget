/**
 * useBadge
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { bgSetBadge } from '@/scripts/background'
import { useEffect, useState } from 'react'

/**
 * Set the badge through the background script
 * @returns Function to set the badge
 */
export function useBadge (): (value: number) => void {
  const [value, setValue] = useState<number>()

  useEffect(() => {
    if (value !== undefined) {
      const text = value === 0 ? '' : value.toString()

      bgSetBadge(text).catch((error) => {
        console.log('useBadge.ts > setBadgeText', error)
      })
    }
  }, [value])

  return setValue
}

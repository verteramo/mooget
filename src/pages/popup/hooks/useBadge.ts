/*******************************************************************************
 * useBadge.ts
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External dependencies */
import { useEffect, useState } from 'react'

/** Project dependencies */
import { bgSetBadgeText } from '@/scripts/background'

/**
 * Set the badge through the background script
 * @returns Function to set the badge
 */
export function useBadge (): (value: number) => void {
  const [value, setValue] = useState<number>()

  useEffect(() => {
    if (value !== undefined) {
      const text = value === 0 ? '' : value.toString()

      bgSetBadgeText(text).catch((error) => {
        console.log('useBadge.ts > setBadgeText', error)
      })
    }
  }, [value])

  return setValue
}

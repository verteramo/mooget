/**
 * usePageContext
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { useEffect, useState } from 'react'
import { ITest } from '../core/Scraping'
import { getITest } from '../scripts/content'

/**
 * Hook to manage the context of the page
 * @returns Context and setTestName function
 */
export function useTest (): [ITest | undefined, (id: string) => void] {
  const [test, setTest] = useState<ITest | undefined>(undefined)

  /**
   * Set test ID
   * @param id Test ID
   */
  const setTestId = (id: string): void => {
    if (test !== undefined) {
      setTest({ ...test, id })
    }
  }

  useEffect(() => {
    // Get test from content script
    getITest().then(setTest).catch(console.error)
  }, [])

  // Expose hooks
  return [test, setTestId]
}

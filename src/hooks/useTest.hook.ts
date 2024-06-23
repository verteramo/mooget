/**
 * usePageContext
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { Test } from '@/models'
import { useEffect, useState } from 'react'
import { getITest } from '../scripts/content'

/**
 * Hook to manage the context of the page
 * @returns Context and setTestName function
 */
export function useTest (): [Test | undefined, (id: string) => void] {
  const [test, setTest] = useState<Test | undefined>(undefined)

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

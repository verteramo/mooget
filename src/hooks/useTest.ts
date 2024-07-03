/**
 * useTest
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { Test, defaultTest } from '@/models'
import { getTest } from '@/scripts/content'
import { useEffect, useState } from 'react'

/**
 * useTest
 * Get the test
 * @returns Test and setTestName
 */
export function useTest (): [Test | undefined, (id: string) => void] {
  const [test, setTest] = useState<Test>(defaultTest)

  /**
   * Set the test name
   * @param name Test name
   */
  function setName (name: string): void {
    if (test !== undefined) {
      setTest({ ...test, name })
    }
  }

  // Get the test on mount
  useEffect(function () {
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      getTest(undefined, { tabId: tab.id }).then(setTest).catch(console.error)
    }).catch(console.error)
  }, [])

  return [test, setName]
}

/**
 * useTest
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget
 */

import { ITest } from '@/dom'
import { getTest } from '@/scripts/content'
import { useEffect, useState } from 'react'

/**
 * useTest
 * Get the test
 * @returns Test and setTestName
 */
export function useTest (): [ITest | undefined, (id: string) => void] {
  const [test, setTest] = useState<ITest | undefined>()

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

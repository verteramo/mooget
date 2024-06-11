/**
 * usePageContext
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { useEffect, useState } from "react";
import { Context } from "../core/Analyzer";
import { Subject } from "../core/Utils";

/**
 * Hook to manage the context of the page
 * @returns Context and setTestName function
 */
export function usePageContext(): [Context | undefined, (name: string) => void] {

  /** Context state */
  const [context, setContext] = useState<Context>()

  /**
   * Set the test name
   * @param name Test name
   */
  const setTestName = (name: string) => {
    if (context?.test) {
      setContext({
        ...context,
        test: {
          ...context.test,
          name
        }
      })
    }
  }

  /**
   * Initialize the context
   * @returns Context
   */
  const initContext = async (): Promise<Context> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return chrome.tabs.sendMessage(tab.id as number, { subject: Subject.GetContext })
  }

  useEffect(() => {
    // Initialize the context
    initContext().then(setContext)
  }, [])

  // Expose hooks
  return [context, setTestName]
}

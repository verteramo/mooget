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
   * Sets the test name
   * @param name Test name
   */
  const setTestName = (name: string) => {
    const newContext = context

    if (newContext?.test) {
      newContext.test.name = name
    }

    setContext(newContext)
  }

  /**
   * Initializes the context
   * @returns Context
   */
  const initContext = async (): Promise<Context> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return chrome.tabs.sendMessage(tab.id as number, { subject: Subject.GetContext })
  }

  useEffect(() => {
    // Initializes the context
    initContext().then(setContext)
  }, [])

  // Exposes hooks
  return [context, setTestName]
}

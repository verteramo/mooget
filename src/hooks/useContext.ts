/**
 * Context Hook
 * 
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import { useEffect, useState } from "react";
import { Context } from "../core/Analyzer";
import { Subject } from "../core/Utils";

export function useContext(): [Context | undefined, (name: string) => void] {
  const [context, setContext] = useState<Context>()

  const setTestTag = (name: string) => {
    setContext({
      ...(context as Context), test: { ...(context as Context).test, name },
    })
  }

  const initContext = async (): Promise<Context> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    return chrome.tabs.sendMessage(tab.id as number, { subject: Subject.GetContext })
  }

  useEffect(() => {
    initContext().then(setContext)
  }, [])

  return [context, setTestTag]
}

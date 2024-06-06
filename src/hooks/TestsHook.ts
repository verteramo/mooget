import { useState, useEffect } from "react";
import { Subject } from "../core/Constants";
import { ITest } from "../core/Models";

export function TestsHook() {
  const [test, setTest] = useState<ITest>()
  const [tests, setTests] = useState<ITest[]>()

  const getTests = async () => {
    setTests(
      await chrome.runtime.sendMessage({
        subject: Subject.GetTests,
      })
    )
  }

  const getTest = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    setTest(
      await chrome.tabs.sendMessage(
        tab.id as number,
        { subject: Subject.GetTest }
      )
    )
  }

  useEffect(() => {
    getTest()
    getTests()
  }, []);

  return {
    test,
    tests,
  }
}

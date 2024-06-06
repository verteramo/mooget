import { useState, useEffect } from "react";
import { Subject, Storage } from "../core/Constants";
import { ITest } from "../core/Models";

export function ContextHook() {
  const [test, setTest] = useState<ITest>()
  const [tests, setTests] = useState<ITest[]>()

  chrome.storage.onChanged.addListener((changes) => {
    if (changes[Storage.Tests]) {
      setTests(changes[Storage.Tests].newValue)
    }
  })

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        tab.id as number, { subject: Subject.GetTest }, setTest
      )
    })

    chrome.storage.local.get([Storage.Tests], ({ tests }) => setTests(tests))
  }, [])

  const insertTest = () => {
    chrome.storage.local.get([Storage.Tests], (data) => {
      const current: ITest[] = data.tests || [];
      for (let i = 0; i < current.length; i++) {
        if (current[i].title === test?.title) {
          current[i].questions = current[i].questions.map(q1 => {
            const found = (test?.questions || []).find(q2 => q2.html === q1.html)
            return {...q1, ...found}
          })
          chrome.storage.local.set({ tests: current });
          return;
        }
      }
      chrome.storage.local.set({ tests: [...current, test] });
    });
  };

  const downloadTest = (index: number) => {
    console.log(`Download test ${index}`);
  };

  const deleteTest = (index: number) => {
    chrome.storage.local.get([Storage.Tests], (data) => {
      const currentTests: ITest[] = data.tests || [];
      currentTests.splice(index, 1);
      chrome.storage.local.set({ tests: currentTests });
    });
  };

  return {
    test,
    tests,
    insertTest,
    downloadTest,
    deleteTest,
  }
}

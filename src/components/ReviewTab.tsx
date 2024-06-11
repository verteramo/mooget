/**
 * Main component
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Test } from "../core/Analyzer";
import { usePageContext } from "../hooks/usePageContext";
import { useStorageList } from "../hooks/useStorageList";
import { ReviewForm } from "./ReviewForm";
import { ReviewTable } from "./ReviewTable";

/**
 * Body card content component
 * @returns Main component
 */
export function ReviewTab(): JSX.Element {

  const [context, setTestName] = usePageContext();

  const [list, insert, update, remove] = useStorageList<Test>({
    variable: "tests",
    area: chrome.storage.local,
  });

  const find = (id: string) => {
    return list && list.find((element) => element.id === id);
  };

  const insertTest = (test: Test) => insert(
    test,
    element => element.id === test.id,
    current => ({
      ...current,
      name: test.name as string,
      questions: [
        ...current.questions,
        ...test.questions,
      ],
    })
  )

  return (
    <>
      {context?.test && !find(context.test.id) && (
        <ReviewForm
          test={context.test}
          onChange={e => setTestName(e.target.value)}
          onClick={() => insertTest(context?.test as Test)} />
      )}
      {list?.length ? (
        <ReviewTable
          list={list}
          onDownload={(index) => console.log(`Download: ${index}`)}
          onDelete={(index) => remove(index)}
          onUpdate={(index, test) => update(index, test)} />
      ) : (
        <p>No tests stored</p>
      )}
    </>
  );
}

/**
 * Main component
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import {
  Button,
  Table,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Download, Floppy, XLg } from "react-bootstrap-icons";

import { Test } from "../core/Analyzer";
import { usePageContext } from "../hooks/usePageContext";
import { useStorageList } from "../hooks/useStorageList";
import { Confirm } from "./Confirm";
import { useState } from "react";

/**
 * Body card content component
 * @returns Main component
 */
export function Main(): JSX.Element {
  
  /** Page context */
  const [context, setTestTag] = usePageContext();

  /** Storage list */
  const [list, insert, update, remove] = useStorageList<Test>({
    variable: "tests",
    area: chrome.storage.local,
  });

  /** Selected test for deletion */
  const [selected, setSelected] = useState<{
    index: number;
    name: string;
  }>();

  /** Modal visibility */
  const [showModal, setShowModal] = useState(false);

  /**
   * Finds a test by ID
   * @param id Test ID
   * @returns Test
   */
  const find = (id: string) => {
    return list && list.find((element) => element.id === id);
  };

  console.log("Main render");
  console.log(context);

  return (
    <>
      {context?.test && !find(context.test.id) && (
        <InputGroup size="sm">
          <FormControl
            type="text"
            value={context.test.name}
            onChange={(e) => setTestTag(e.target.value)}
          />
          <InputGroup.Text>
            {context.test.questions.length} Questions
          </InputGroup.Text>
          <Button
            title="Save"
            onClick={() =>
              insert(
                context.test as Test,
                (element) => element.id === context.test?.id,
                (current) => ({
                  ...current,
                  name: context.test?.name as string,
                  questions: [
                    ...current.questions,
                    ...(context.test?.questions ?? []),
                  ],
                })
              )
            }
          >
            <Download />
          </Button>
        </InputGroup>
      )}
      {list?.length ? (
        <>
          <Table className="mt-2" striped bordered hover>
            <thead>
              <tr>
                <th className="col-9">Test</th>
                <th className="col-1">Questions</th>
                <th className="col-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((test, index) => (
                <tr key={index}>
                  <td align="center" className="align-middle">
                    <Form.Control
                      type="text"
                      size="sm"
                      value={test.name}
                      onChange={(e) =>
                        update(index, { ...test, name: e.target.value })
                      }
                    />
                  </td>
                  <td align="center" className="align-middle">
                    {test.questions.length}
                  </td>
                  <td align="center" className="align-middle">
                    <Button
                      title="Download"
                      size="sm"
                      variant="info"
                      className="rounded-circle me-2"
                      onClick={() => {}}
                    >
                      <Floppy />
                    </Button>
                    <Button
                      title="Delete"
                      size="sm"
                      variant="danger"
                      className="rounded-circle"
                      onClick={() => {
                        setSelected({ index, name: test.name });
                        setShowModal(true);
                      }}
                    >
                      <XLg />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Confirm
            title="Confirm deletion"
            show={showModal}
            onAccept={() => {
              remove(selected?.index as number);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          >
            Delete test '{selected?.name}'?
          </Confirm>
        </>
      ) : (
        <Container className="text-center text-muted">
          <p>No tests stored</p>
        </Container>
      )}
    </>
  );
}

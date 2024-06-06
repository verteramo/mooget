import { InputGroup, FormControl, Button, Table } from "react-bootstrap";
import { CloudArrowDownFill, TrashFill } from "react-bootstrap-icons";
import { ContextHook } from "../hooks/ContextHook";

export function TestsTable(): JSX.Element {
  const { test, tests, insertTest, downloadTest, deleteTest } = ContextHook();

  return (
    <>
      {test && (
        <InputGroup size="sm" className="mb-3">
          <FormControl readOnly value={test?.title} />
          <InputGroup.Text>{test?.questions.length} Preguntas</InputGroup.Text>
          <Button onClick={insertTest}>Guardar</Button>
        </InputGroup>
      )}
      {tests?.length ? (
        <Table size="sm" bordered>
          <thead>
            <tr className="d-flex">
              <th className="col-8">Cuestionario</th>
              <th className="col-2">Preguntas</th>
              <th className="col-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tests?.map((test, index) => (
              <tr key={index} className="d-flex">
                <td className="col-8 align-content-center flex-wrap">
                  {test.title}
                </td>
                <td className="col-2 align-content-center flex-wrap">
                  {test.questions.length}
                </td>
                <td className="col-2 align-content-center flex-wrap">
                  <Button size="sm" variant="danger" className="me-2">
                    <TrashFill onClick={() => deleteTest(index)} />
                  </Button>
                  <Button size="sm" variant="success" className="me-2">
                    <CloudArrowDownFill onClick={() => downloadTest(index)} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted text-center">No hay cuestionarios</p>
      )}
    </>
  );
}

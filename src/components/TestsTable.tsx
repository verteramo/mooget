import { Table } from "react-bootstrap";
import { ITest } from "../core/Models";

type TestsTableProps = {
  tests: ITest[];
};

export function TestsTable({ tests }: TestsTableProps): JSX.Element {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Cuestionario</th>
          <th>Preguntas</th>
        </tr>
      </thead>
      <tbody>
        {tests.map((test, index) => (
          <tr key={index}>
            <td>{test.title}</td>
            <td>{test.questions.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

/**
 * Popup de la extensión
 */

import { createRoot } from "react-dom/client";
import { Card, Form } from "react-bootstrap";
import { ThemeHook } from "../hooks/ThemeHook";
import { TestsHook } from "../hooks/TestsHook";
import { Footer } from "../components/Footer";
import { TestsTable } from "../components/TestsTable";
import { Github } from "react-bootstrap-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/popup.css";

export function Popup() {
  const { isDark, toggleTheme } = ThemeHook();
  const { test, tests } = TestsHook();

  console.log("Hola");
  console.log(test);

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Card.Title>Mooget</Card.Title>
          <Form>
            <Form.Check
              type="switch"
              label="Dark"
              checked={isDark()}
              onChange={toggleTheme}
            />
          </Form>
        </div>
      </Card.Header>
      <Card.Body>
        {tests ? <TestsTable tests={tests} /> : "No hay cuestionarios"}
      </Card.Body>
      <Card.Footer>
        <Footer
          links={[
            {
              name: "GitHub",
              href: "https://github.com/verteramo",
              icon: Github,
            },
          ]}
        />
      </Card.Footer>
    </Card>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<Popup />);

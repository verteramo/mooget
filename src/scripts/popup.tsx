/**
 * Popup de la extensión
 */

import { createRoot } from "react-dom/client";
import { Card, Form } from "react-bootstrap";
import { ThemeHook } from "../hooks/ThemeHook";
import { Footer } from "../components/Footer";
import { Github } from "react-bootstrap-icons";
import { TestsTable } from "../components/TestsTable";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/popup.css";

export function Popup(): JSX.Element {
  const { isDark, toggleTheme } = ThemeHook();

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Card.Title>Mooget</Card.Title>
          <Form.Check
            type="switch"
            label="Dark"
            title="Dark"
            placeholder="Dark"
            checked={isDark()}
            onChange={toggleTheme}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <TestsTable />
        </Card.Text>
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

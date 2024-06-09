/**
 * Popup
 *
 * @link https://github.com/verteramo
 * @license GNU GPLv3
 */

import { createRoot } from "react-dom/client";
import { Card, Form } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { useTheme } from "../hooks/useTheme";
import { Main } from "../components/Main";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/popup.css";

export function Popup(): JSX.Element {
  const manifest = chrome.runtime.getManifest();
  const [isDark, toggleTheme] = useTheme();

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Card.Title>{manifest.name}</Card.Title>
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
        <Main />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <a
          title={manifest.name}
          href={manifest.homepage_url}
          target="_blank"
        >
          <Github />
        </a>
      </Card.Footer>
    </Card>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<Popup />);

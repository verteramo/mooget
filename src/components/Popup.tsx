/**
 * Popup component
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Card, Form } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { useTheme } from "../hooks/useTheme";
import { Main } from "./Main";

/**
 * Main card of the popup
 * @returns Card component
 */
export function Popup(): JSX.Element {
  /** Manifest */
  const manifest = chrome.runtime.getManifest();

  /** Theme hook */
  const [dark, toggleTheme] = useTheme();

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
            checked={dark}
            onChange={toggleTheme}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <Main />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <a title={manifest.name} href={manifest.homepage_url} target="_blank">
          <Github />
        </a>
      </Card.Footer>
    </Card>
  );
}

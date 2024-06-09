/**
 * Confirm component
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Button, Modal } from "react-bootstrap";
import { CheckLg, XLg } from "react-bootstrap-icons";

/**
 * Confirm properties
 * @property title Modal title
 * @property show Modal visibility
 * @property onAccept Accept event
 * @property onCancel Cancel event
 * @property children Modal children
 */
interface ConfirmProps {
  title: string;
  show: boolean;
  onAccept: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

/**
 * Confirm component
 * @param title Modal title
 * @param show Modal visibility
 * @param onAccept Accept event
 * @param onCancel Cancel event
 * @param children Modal children
 * @returns Modal component
 */
export function Confirm({
  title,
  show,
  onAccept,
  onCancel,
  children,
}: ConfirmProps) {
  return (
    <>
      <Modal centered size="sm" backdrop="static" show={show} onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="success"
            className="rounded-circle"
            onClick={onAccept}
          >
            <CheckLg />
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="rounded-circle"
            onClick={onCancel}
          >
            <XLg />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

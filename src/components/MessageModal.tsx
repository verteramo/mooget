/**
 * Confirm component
 * 
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { Button, Modal } from "react-bootstrap";
import { CheckLg, XLg } from "react-bootstrap-icons";

interface MessageModalProps {
  title: string;
  show: boolean;
  onAccept: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export function MessageModal({
  title,
  show,
  onAccept,
  onCancel,
  children,
}: MessageModalProps) {
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

import { Button, Form, Table } from "react-bootstrap";
import { Test } from "../core/Analyzer";
import { Floppy, XLg } from "react-bootstrap-icons";
import { MessageModal } from "./MessageModal";
import { useState } from "react";

interface ReviewTableProps {
    list: Test[]
    onUpdate: (index: number, test: Test) => void
    onDelete: (index: number) => void
    onDownload: (index: number) => void
}

export function ReviewTable({
    list,
    onUpdate,
    onDelete,
    onDownload,
}: ReviewTableProps): JSX.Element {

    const [selected, setSelected] = useState<{
        index: number;
        name: string;
    }>();

    const [messageModalVisible, setShow] = useState(false);

    const onDeleting = (index: number) => {
        setSelected({ index, name: list[index].name });
        setShow(true);
    }

    const onConfirm = (index: number) => {
        onDelete(index);
        setShow(false);
    }

    return (
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
                                    size="sm"
                                    type="text"
                                    value={test.name}
                                    onChange={e => onUpdate(index, { ...test, name: e.target.value })}
                                />
                            </td>
                            <td align="center" className="align-middle">
                                {test.questions.length}
                            </td>
                            <td align="center" className="align-middle">
                                <Button
                                    size="sm"
                                    variant="info"
                                    className="rounded-circle me-2"
                                    title="Download"
                                    onClick={() => onDownload(index)}>
                                    <Floppy />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    className="rounded-circle"
                                    title="Delete"
                                    onClick={() => onDeleting(index)}>
                                    <XLg />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <MessageModal
                title="Confirm deletion"
                show={messageModalVisible}
                onCancel={() => setShow(false)}
                onAccept={() => onConfirm(selected?.index as number)}>
                Delete test '{selected?.name}'?
            </MessageModal>
        </>
    )
}

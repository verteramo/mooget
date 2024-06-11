import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Test } from "../core/Analyzer";
import { Download } from "react-bootstrap-icons";

interface TestFormProps {
    test: Test
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

export function ReviewForm({
    test,
    onChange,
    onClick,
}: TestFormProps): JSX.Element {
    return (
        <InputGroup size="sm">
            <FormControl type="text" value={test.name} onChange={onChange} />
            <InputGroup.Text>
                {test.questions.length} questions
            </InputGroup.Text>
            <Button title="Save" onClick={onClick}>
                <Download />
            </Button>
        </InputGroup>
    )
}

import { Tab, Tabs } from "react-bootstrap";
import { ReviewTab } from "./ReviewTab";

export function Main(): JSX.Element {
    return (
        <Tabs
            defaultActiveKey="reviews"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="reviews" title="Reviews">
                <ReviewTab />
            </Tab>
            <Tab eventKey="attempts" title="Attempts">
                Tab content for Profile
            </Tab>
        </Tabs>
    );
}

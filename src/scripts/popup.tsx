/**
 * Popup script
 *
 * @license GNU GPLv3
 * @link https://github.com/verteramo/mooget-ext
 */

import { createRoot } from "react-dom/client";
import { Popup } from "../components/Popup";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/popup.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(<Popup />);

import { createRoot } from "react-dom/client";
import { Online, Offline } from 'react-detect-offline'
import { Alert } from "antd";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <>
    <Online><App /></Online>
    <Offline> <Alert
            message="Connection is lost"
            type="error"
            showIcon
            className="error-message"
          /> </Offline>
</>
);

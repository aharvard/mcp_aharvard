import { UIActionResult } from "@mcp-ui/server";

export const postMessageUIAction = (action: UIActionResult) => {
    console.log("posting message", action);

    const formattedAction = JSON.stringify(action, null, 2).replace(/"/g, "'");

    console.log("formattedAction", formattedAction);

    return `(${formattedAction}, '*');`;
};

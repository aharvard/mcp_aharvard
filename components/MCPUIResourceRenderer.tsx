"use client";

import React, { useCallback, useState } from "react";
import { UIActionResult, UIResourceRenderer } from "@mcp-ui/client";
import { useToast } from "./ToastContainer";

interface MCPUIResourceRendererProps {
    resource: any;
    onUIAction?: (result: UIActionResult) => Promise<{ status: string }>;
    initialIframeHeight?: string;
}

const MCPUIResourceRenderer: React.FC<MCPUIResourceRendererProps> = ({
    resource,
    onUIAction,
    initialIframeHeight = "0px",
}) => {
    const [iframeHeight, setIframeHeight] = useState(initialIframeHeight);

    const { showToast } = useToast();

    // Add message listener to handle postMessage events from iframe
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Only handle messages from our iframe
            if (event.data && event.data.type === "size-change") {
                console.log(
                    "Received size-change message from iframe:",
                    event.data
                );
                setIframeHeight(event.data.payload.height);
                showToast({
                    type: "info",
                    title: "Size Updated",
                    message: `Iframe height changed to ${event.data.payload.height} from ${event.data.payload.info}`,
                    duration: 4000,
                });
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [showToast]);

    const handleUIAction = useCallback(
        async (result: UIActionResult) => {
            console.log("Handle action from MCP UI Action:", result);

            // If a custom onUIAction handler is provided, use it
            if (onUIAction) {
                return await onUIAction(result);
            }

            // Default UI action handling
            switch (result.type) {
                case "intent":
                    showToast({
                        type: "info",
                        title: "Intent Message Sent",
                        message: `Full Object: ${JSON.stringify(
                            {
                                type: "intent",
                                payload: result.payload,
                                messageId: "optional-intent-message-id",
                            },
                            null,
                            2
                        )}`,
                        duration: 4000,
                    });
                    break;

                case "link":
                    showToast({
                        type: "info",
                        title: "Link Message Sent",
                        message: `Full Object: ${JSON.stringify(
                            {
                                type: "link",
                                payload: result.payload,
                                messageId: "optional-link-message-id",
                            },
                            null,
                            2
                        )}`,
                        duration: 4000,
                    });
                    break;

                case "notify":
                    showToast({
                        type: "info",
                        title: "Notification Message Sent",
                        message: `Full Object: ${JSON.stringify(
                            {
                                type: "notify",
                                payload: result.payload,
                                messageId: "optional-notify-message-id",
                            },
                            null,
                            2
                        )}`,
                        duration: 5000,
                    });
                    break;

                case "prompt":
                    showToast({
                        type: "info",
                        title: "Prompt Message Sent",
                        message: `Full Object: ${JSON.stringify(
                            {
                                type: "prompt",
                                payload: result.payload,
                                messageId: "optional-prompt-message-id",
                            },
                            null,
                            2
                        )}`,
                        duration: 6000,
                    });
                    break;

                case "tool":
                    showToast({
                        type: "info",
                        title: "Tool Message Sent",
                        message: `Full Object: ${JSON.stringify(
                            {
                                type: "tool",
                                payload: result.payload,
                                messageId: "optional-tool-message-id",
                            },
                            null,
                            2
                        )}`,
                        duration: 4000,
                    });
                    break;
            }

            return { status: "handled" };
        },
        [onUIAction, showToast]
    );

    return (
        <div className="overflow-hidden border-2 ">
            <UIResourceRenderer
                resource={resource}
                onUIAction={handleUIAction}
                htmlProps={{
                    style: { minHeight: iframeHeight },
                }}
            />
        </div>
    );
};

export default MCPUIResourceRenderer;

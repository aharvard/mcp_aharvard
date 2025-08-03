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
        console.log("Received size-change message from iframe:", event.data);
        setIframeHeight(event.data.payload.height);
        // showToast({
        //   type: "success",
        //   title: "Size Updated",
        //   message: `Iframe height changed to ${event.data.payload.height} from ${event.data.payload.info}`,
        //   duration: 10000,
        // });
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
            title: "Intent Received",
            message: "An intent action was triggered from the UI resource",
            duration: 4000,
          });
          break;

        case "link":
          showToast({
            type: "info",
            title: "Link Action",
            message: "A link action was triggered from the UI resource",
            duration: 4000,
          });
          break;

        case "notify":
          showToast({
            type: "success",
            title: "Notification",
            message: "A notification action was triggered from the UI resource",
            duration: 5000,
          });
          break;

        case "prompt":
          showToast({
            type: "warning",
            title: "Prompt Action",
            message: "A prompt action was triggered from the UI resource",
            duration: 6000,
          });
          break;

        case "tool":
          showToast({
            type: "info",
            title: "Tool Action",
            message: "A tool action was triggered from the UI resource",
            duration: 4000,
          });
          break;
      }

      return { status: "handled" };
    },
    [onUIAction, showToast]
  );

  return (
    <div className="overflow-hidden">
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

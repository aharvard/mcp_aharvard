export const RemoteDomDemo = (config: {
    theme?: "light" | "dark";
    showAdvanced?: boolean;
}) => {
    const { theme = "light", showAdvanced = false } = config;

    // Use variables to avoid linter warnings
    console.log("⚾️Remote DOM Demo config:", { theme, showAdvanced });

    // Create a comprehensive remote DOM script that demonstrates various UI components
    const remoteDomScript = `
        // Clear the root element
        root.innerHTML = '';
        
        // Create a container with theme-based styling
        const container = document.createElement('div');
        container.style.cssText = \`
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 24px;
            border-radius: 12px;
            background: \${theme === 'dark' ? '#1f2937' : '#ffffff'};
            color: \${theme === 'dark' ? '#f9fafb' : '#111827'};
            border: 1px solid \${theme === 'dark' ? '#374151' : '#e5e7eb'};
            max-width: 600px;
            margin: 0 auto;
        \`;
        
        // Create header
        const header = document.createElement('h1');
        header.textContent = '🚀 Remote DOM Demo';
        header.style.cssText = \`
            margin: 0 0 24px 0;
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            color: \${theme === 'dark' ? '#60a5fa' : '#2563eb'};
        \`;
        container.appendChild(header);
        
        // Create description
        const description = document.createElement('p');
        description.textContent = 'This demonstrates interactive components using MCP-UI Remote DOM. Click the buttons below to see different interactions!';
        description.style.cssText = \`
            margin: 0 0 24px 0;
            line-height: 1.6;
            text-align: center;
            opacity: 0.8;
        \`;
        container.appendChild(description);
        
        // Create interactive button section
        const buttonSection = document.createElement('div');
        buttonSection.style.cssText = \`
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
        \`;
        
        // Create various interactive buttons
        const createButton = (label: string, action: string, color: string) => {
            const button = document.createElement('ui-button');
            button.setAttribute('label', label);
            button.setAttribute('variant', 'primary');
            button.style.cssText = \`
                background: \${color};
                border: none;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                min-width: 120px;
            \`;
            
            button.addEventListener('press', () => {
                window.parent.postMessage({
                    type: 'tool',
                    payload: {
                        toolName: 'remoteDomInteraction',
                        params: {
                            action: action,
                            timestamp: new Date().toISOString(),
                            theme: theme
                        }
                    }
                }, '*');
            });
            
            return button;
        };
        
        // Add buttons
        buttonSection.appendChild(createButton('🎯 Click Me!', 'button-click', '#3b82f6'));
        buttonSection.appendChild(createButton('💡 Toggle Theme', 'theme-toggle', '#10b981'));
        buttonSection.appendChild(createButton('📊 Show Data', 'show-data', '#f59e0b'));
        
        if (showAdvanced) {
            buttonSection.appendChild(createButton('⚡ Advanced', 'advanced-action', '#8b5cf6'));
        }
        
        container.appendChild(buttonSection);
        
        // Create dynamic content area
        const contentArea = document.createElement('div');
        contentArea.id = 'dynamic-content';
        contentArea.style.cssText = \`
            background: \${theme === 'dark' ? '#374151' : '#f3f4f6'};
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            min-height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid \${theme === 'dark' ? '#4b5563' : '#d1d5db'};
        \`;
        
        const initialContent = document.createElement('p');
        initialContent.textContent = 'Click any button above to see dynamic content here!';
        initialContent.style.cssText = \`
            margin: 0;
            text-align: center;
            opacity: 0.7;
            font-style: italic;
        \`;
        contentArea.appendChild(initialContent);
        container.appendChild(contentArea);
        
        // Create status indicator
        const statusIndicator = document.createElement('div');
        statusIndicator.style.cssText = \`
            margin-top: 20px;
            padding: 12px;
            background: \${theme === 'dark' ? '#065f46' : '#d1fae5'};
            border: 1px solid \${theme === 'dark' ? '#047857' : '#a7f3d0'};
            border-radius: 6px;
            text-align: center;
            font-size: 14px;
            color: \${theme === 'dark' ? '#d1fae5' : '#065f46'};
        \`;
        statusIndicator.textContent = '✅ Remote DOM Demo Loaded Successfully';
        container.appendChild(statusIndicator);
        
        // Add the container to root
        root.appendChild(container);
        
        // Add some interactive behavior
        let clickCount = 0;
        const updateClickCount = () => {
            clickCount++;
            const clickDisplay = document.createElement('div');
            clickDisplay.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: \${theme === 'dark' ? '#dc2626' : '#ef4444'};
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                z-index: 1000;
                animation: fadeInOut 2s ease-in-out;
            \`;
            clickDisplay.textContent = \`Clicks: \${clickCount}\`;
            document.body.appendChild(clickDisplay);
            
            // Remove after animation
            setTimeout(() => {
                if (clickDisplay.parentNode) {
                    clickDisplay.parentNode.removeChild(clickDisplay);
                }
            }, 2000);
        };
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-10px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        \`;
        document.head.appendChild(style);
        
        // Add click counter to all buttons
        document.querySelectorAll('ui-button').forEach(button => {
            button.addEventListener('press', updateClickCount);
        });
    `;

    return remoteDomScript;
};

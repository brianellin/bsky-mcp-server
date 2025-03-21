# Bluesky MCP Server

A Model Context Protocol (MCP) server that connects to Bluesky and provides tools to interact with the ATProtocol.

## Features

- Authentication with Bluesky via environment variables
- Fetch and display your home timeline
- Get pinned feeds, and feed and list content
- Search for people, posts, and feeds
- Write posts! 
- Post, like, and follow functionality
- Access to raw profile and timeline data

## Installation

First clone this repo, then install dependencies and build the server:

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build
```

### Testing with MCP Inspector

You can test this server using the amazing [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector). First make sure you have built the server and then:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

Set your BLUESKY_IDENTIFIER, BLUESKY_APP_PASSWORD, and BLUESKY_SERVICE_URL environment variables from the panel on the left to start testing. 

## MCP Client Configuration 

Follow the steps to set up MCP with your client of choice. For example, to set up Claude for desktop to connect to Bluesky, add the following to bluesky section to your claude_desktop_config.json:

```json
{
    "mcpServers": {
      "bluesky": {
        "command": "node",
        "args": ["/path/to/bsky-mcp-server/build/src/index.js"],
        "env": {
            "BLUESKY_IDENTIFIER": "your-bluesky-handle",
            "BLUESKY_APP_PASSWORD": "your-app-password",
            "BLUESKY_SERVICE_URL": "https://bsky.social"
          }
      }
    }
  }
```

For more details about running MCP servers in Claude for desktop, see https://modelcontextprotocol.io/quickstart/user

## Available Tools


## Creating App Passwords

To use this MCP server, you need to create an app password for your Bluesky account:

1. Log in to Bluesky
2. Go to Settings > App Passwords
3. Create a new app password specifically for this integration
4. Use this app password with the `login` tool (not your regular account password)

## Security Notes

- This server stores your session information in memory only and does not share it with the MCP client.
- The MCP client only has access to the tools, not to your authentication or app password

## License

MIT
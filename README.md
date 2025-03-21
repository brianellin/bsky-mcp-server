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

```bash
# Clone the repository
git clone <your-repo-url>
cd bluesky-mcp-server

# Install dependencies
pnpm install

# Build the project
pnpm run build
```

## Configuration

Follow the steps to set up MCP with your client of choice. For example, to set up Claude for desktop to connect to Bluesky, 

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

## Usage

### Running the server

```bash
pnpm start
```

### Testing with MCP Inspector

You can test this server using the MCP Inspector:

```bash
pnpm exec @modelcontextprotocol/inspector node build/index.js
```

### Running Tests

The project includes several tests for the post formatting utilities:

```bash
# Run all tests
pnpm test:all

# Run individual test suites
pnpm test           # Run the final comprehensive test
pnpm test:enhanced  # Test enhanced formatter with real data
pnpm test:format    # Test basic formatting functions
pnpm test:specific  # Test with specific complex posts
```

See the [test directory README](./test/README.md) for more details on the testing structure.

### Integrating with Claude for Desktop

To use this server with Claude for Desktop, add it to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "bluesky": {
      "command": "node",
      "args": ["/path/to/bsky-mcp-server/build/index.js"]
    }
  }
}
```

## Project Structure

```
├── src/           # Source code
│   ├── index.ts   # Main server entry point  
│   └── utils.ts   # Utility functions
├── test/          # Test files
│   ├── final-test.ts              # Comprehensive end-to-end test
│   ├── test-enhanced-formatter.ts # Tests for enhanced post formatter
│   ├── test-format-post.ts        # Basic formatter tests
│   └── test-specific-post.ts      # Tests with specific complex posts
└── build/         # Compiled JavaScript output
```

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
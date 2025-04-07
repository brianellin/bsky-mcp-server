# Bluesky MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) server that connects to [Bluesky](https://bsky.app/) and provides tools to interact with the ATProtocol.

You can use this MCP server to bring context from various Bluesky / ATProtocol API endpoints directly into the context window of your LLM based application. For example, you can add this server to Claude Desktop and then use it as a natural language Bluesky client. 

## Features & Tools

- Interact with common Bluesky features via natural language (e.g. "Get recent posts from David Roberts")
- Fetch and analyze feeds ("Find me a feed about Seattle and tell me what people are talking about")
- Fetch and analyze lists of followers ("What types of accounts does Mark Cuban follow? Give me a detailed report")
- Use an LLM to write a post and then post it for you 😱 ("Write a haiku about today's weather in my area and post it to bluesky")
- Search for feeds, posts, and people ("Find posts about the #teslatakedown and give me a summary of revent events")
- Analyze who follows you? ("Who follows me on Bluesky? Give me a report")

Here's the current list of tools provided:

- **get-pinned-feeds**: returns the set of all "pinned" items from the authenticated user's preferences.
- **get-timeline-posts**: returns posts from the authenticated user's home timeline
- **get-feed-posts**: returns posts from the specified feed
- **get-list-posts**: returns posts from the specified list
- **get-user-posts**: returns the specified user's posts
- **get-profile**: returns the profile details of the specified user
- **get-follows**: returns the set of users an account follows
- **get-followers**: returns the set of users who follow an account
- **get-liked-posts**: returns recent posts liked by the authenticated user
- **get-trends**: returns current trending topics on Bluesky with post counts
- **search-posts**: returns posts for a given query. can specify top or lateest
- **search-people**: returns people for a given search query
- **search-feeds**: returns feeds for a given query
- **like-post**: like a post with a specific URI
- **create-post**: publish a post 
- **follow-user**: follow a specific user

Tips:
- You can ask for post from search, timelines, lists, feeds, or profiles by time range. For example: Summarize posts from my timeline for the last three days" or "Find me the most interesting artcile people have been talknig about this week"
- Get weird: What the funniest/most unhinged/weirdest/goofiest post you've seen on my timeline in the last 24 hours?"
- Learn about yourself: "Analyze my liked posts and tell me what I'm into. Give me 3 interesting facts about what you've found and how it relates to my personality on bluesky" or "Who follows me on bluesky? Give me a comprehensive report."


## Installation

First clone this repo, then install dependencies and build the server:

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build
```

### Testing with MCP Inspector

You can test the bluesky tools directly without connecting to an LLM via the amazing [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector). First make sure you have built the server and then run:

```bash
npx @modelcontextprotocol/inspector node build/src/index.js
```

Navigate to the local URL provided in your terminal, and then set your BLUESKY_IDENTIFIER, BLUESKY_APP_PASSWORD, and BLUESKY_SERVICE_URL environment variables from the panel on the left. Try the get-timeline tool to see the most revent posts from your home timeline. 

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


## Creating App Passwords

To use this MCP server, you need to create an app password for your Bluesky account:

1. Log in to Bluesky
2. Go to Settings > App Passwords
3. Create a new app password specifically for this integration
4. Set the app password using the BLUESKY_APP_PASSWORD environment variable

## Security Notes

- This server stores your session information in memory only and does not share it with the MCP client.
- The MCP client only has access to the tools, not to your authentication or app password

## License

MIT
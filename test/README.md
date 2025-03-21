# Tests for Bluesky MCP Server

This directory contains tests for the Bluesky MCP server, particularly focusing on the post formatting utilities.

## Test Files

- **test-format-post.ts**: Basic tests for the `formatPost` function with manually constructed post objects.
- **test-enhanced-formatter.ts**: Comprehensive tests for the enhanced `formatPost` function using real Bluesky feed data.
- **test-specific-post.ts**: Tests the `formatPost` function on specific complex posts from the feed data.
- **final-test.ts**: A comprehensive end-to-end test for the enhanced `formatPost` function.

## Running Tests

You can run the tests using the npm scripts defined in package.json:

```bash
# Run the final test
pnpm test

# Run the enhanced formatter test
pnpm test:enhanced

# Run the basic format post test
pnpm test:format

# Run the specific post test
pnpm test:specific

# Run all tests
pnpm test:all
```

## Test Data

The tests use example feed data from `feed_example.json`, which contains real Bluesky posts with various features like:

- Basic text posts
- Posts with images
- Posts with external links
- Quote posts
- Reply posts
- Posts with hashtags and mentions
- Nested content and rich features

This allows comprehensive testing of the formatter's ability to handle different types of Bluesky content. 
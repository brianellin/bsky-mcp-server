#!/bin/bash

# Build the project
echo "Building the Bluesky MCP server..."
pnpm run build

# Run unit tests
echo "Running all formatter unit tests..."
pnpm run test:all

# Test with MCP Inspector
echo "Starting MCP Inspector to test the server..."
pnpm exec @modelcontextprotocol/inspector node build/index.js
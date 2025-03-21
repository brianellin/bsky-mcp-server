import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { formatPost } from '../src/utils.js';

// Use absolute paths based on the current working directory
const dataPath = path.join(process.cwd(), 'test/feed_example.json');
const outputPath = path.join(process.cwd(), 'formatted-feed.txt');

console.log("Processing feed_example.json and writing formatted output to file");
console.log(`Looking for data file at: ${dataPath}`);

// Load real feed data
try {
  // Read the feed data
  if (!fs.existsSync(dataPath)) {
    console.error(`Error: File not found at ${dataPath}`);
    process.exit(1);
  }
  
  const fileContent = fs.readFileSync(dataPath, 'utf8');
  console.log(`File content length: ${fileContent.length} characters`);
  
  let jsonData;
  try {
    jsonData = JSON.parse(fileContent);
  } catch (parseError) {
    console.error(`Error parsing JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    console.error(`First 100 characters of file: ${fileContent.substring(0, 100)}...`);
    process.exit(1);
  }
  
  // Extract the feed array from the JSON object
  const feedData = jsonData.feed;
  
  if (!Array.isArray(feedData) || feedData.length === 0) {
    console.error("Error: Feed data is empty or not an array");
    console.error(`Data type: ${typeof feedData}`);
    process.exit(1);
  }
  
  console.log(`Loaded ${feedData.length} posts from feed_example.json`);
  
  // Format each post and join them into a single string
  const formattedOutput = feedData.map((item, index) => {
    console.log(`Formatting post ${index + 1}/${feedData.length}`);
    // Pass the entire item object to formatPost to include repost information
    return formatPost(item, index);
  }).join('\n\n' + '='.repeat(80) + '\n\n');
  
  // Add a header to the file
  const header = `FORMATTED FEED DATA
Generated on: ${new Date().toLocaleString()}
Number of posts: ${feedData.length}

${'='.repeat(80)}

`;
  
  // Write the formatted output to a file
  fs.writeFileSync(outputPath, header + formattedOutput);
  
  console.log(`Successfully wrote formatted feed data to ${outputPath}`);
  
} catch (error) {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
} 
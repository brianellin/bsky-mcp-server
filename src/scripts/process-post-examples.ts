import fs from 'fs';
import path from 'path';
import { preprocessPost, formatFeed, preprocessPosts } from '../llm-preprocessor.js';

async function processPostExamples() {
  // Define paths
  const postExamplesDir = path.join(process.cwd(), 'test', 'example_posts');
  const outputFile = path.join(process.cwd(), 'test', 'post_examples_results.md');

  // Create directories if they don't exist
  if (!fs.existsSync(postExamplesDir)) {
    fs.mkdirSync(postExamplesDir, { recursive: true });
    console.log(`Created directory: ${postExamplesDir}`);
    console.log('Please add your post example JSON files to this directory.');
    return;
  }

  // Read all JSON files from the directory
  const files = fs.readdirSync(postExamplesDir)
    .filter(file => file.endsWith('.json'));

  if (files.length === 0) {
    console.log('No JSON files found in the post_examples directory.');
    return;
  }

  // Process each file and collect results
  let markdownContent = '# Post Examples Processing Results\n\n';
  
  for (const file of files) {
    const filePath = path.join(postExamplesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const postData = JSON.parse(fileContent);
      
      markdownContent += `## File: ${file}\n\n`;
      
      try {
        // Create a FeedItem object to pass to formatPost
        const feedItem = {
          post: postData.post,
          reply: postData.reply,
          reason: postData.reason
        };
        
        // Format the post using the new formatter
        const formattedPost = preprocessPost(feedItem);
        markdownContent += "### Individual Post:\n```xml\n" + formattedPost + "\n```\n\n";
        
        // If it's a thread with reply, also show a full feed example
        if (postData.reply) {
          // Create a simple feed with this post
          const feed = {
            items: [feedItem]
          };
          
          const formattedFeed = formatFeed(feed);
          markdownContent += "### Full Feed:\n```xml\n" + formattedFeed + "\n```\n\n";
        }
        
        // Process with the new preprocessPosts function
        markdownContent += "### Using preprocessPosts:\n```xml\n" + preprocessPosts([feedItem]) + "\n```\n\n";
      } catch (error) {
        markdownContent += `Error processing file:\n\`\`\`\n${error}\n\`\`\`\n\n`;
      }
      
      markdownContent += '\n\n';
    } catch (error) {
      markdownContent += `Error processing file ${file}:\n\`\`\`\n${error}\n\`\`\`\n\n`;
    }
  }

  // Write results to markdown file
  fs.writeFileSync(outputFile, markdownContent);
  console.log(`Results written to: ${outputFile}`);
}

// Run the script
processPostExamples().catch(console.error);

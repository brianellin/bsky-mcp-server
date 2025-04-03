import fs from 'fs';
import path from 'path';
import { formatPost } from '../utils.js';

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
      const posts = JSON.parse(fileContent);
      
      // Handle both single post and array of posts
      const postsArray = Array.isArray(posts) ? posts : [posts];
      
      markdownContent += `## File: ${file}\n\n`;
      
      postsArray.forEach((post, index) => {
        try {
          const formattedPost = formatPost(post, index);
          markdownContent += formattedPost + '\n\n';
        } catch (error) {
          markdownContent += `Error processing post ${index + 1}:\n\`\`\`\n${error}\n\`\`\`\n\n`;
        }
      });
      
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

import fs from 'fs';
import path from 'path';
import { formatPostThread } from '../llm-preprocessor.js';

async function processThreadExamples() {
  // Define paths
  const postExamplesDir = path.join(process.cwd(), 'test', 'example_threads');
  const outputFile = path.join(process.cwd(), 'test', 'thread_examples_results.md');

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
  let markdownContent = '# Thread Examples Processing Results\n\n';
  
  for (const file of files) {
    const filePath = path.join(postExamplesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const threadData = JSON.parse(fileContent);
      
      markdownContent += `## File: ${file}\n\n`;
      
      try {
        // Format the post using the new formatter
        const formattedThread = formatPostThread(threadData.thread);
        markdownContent += "### Thread:\n```xml\n" + formattedThread + "\n```\n\n";
      } catch (error) {
        markdownContent += `Error processing file ${file}:\n\`\`\`\n${error}\n\`\`\`\n\n`;
      }
    } catch (error) {
      markdownContent += `Error processing file ${file}:\n\`\`\`\n${error}\n\`\`\`\n\n`;
    }
  }

  // Write results to markdown file
  fs.writeFileSync(outputFile, markdownContent);
  console.log(`Results written to: ${outputFile}`);
}

// Run the script
processThreadExamples().catch(console.error);

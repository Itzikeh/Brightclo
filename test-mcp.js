try {
  const mcp = require('@brightdata/mcp');
  console.log('MCP loaded successfully');
  console.log('MCP contents:', Object.keys(mcp));
} catch (error) {
  console.error('Failed to load MCP:', error);
}
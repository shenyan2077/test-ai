const fs = require('fs');
const path = require('path');
const os = require('os');

const sessionId = 'a06498f9-e4a3-432e-be82-f7740c5dfd71';
const sessionFile = path.join(os.homedir(), '.claude', 'projects', 'd--Code-test-ai-test-ai', sessionId + '.jsonl');
const raw = fs.readFileSync(sessionFile, 'utf-8');
const lines = raw.split('\n').filter(l => l.trim());

let md = [];
md.push('# Claude Code 聊天记录');
md.push('');
md.push('> 会话 ID: ' + sessionId);
md.push('> 项目目录: D:/Code/test-ai/test-ai');
md.push('> 导出时间: ' + new Date().toLocaleString('zh-CN'));
md.push('');
md.push('---');
md.push('');

let userCount = 0, assistantCount = 0, toolCount = 0;

for (const line of lines) {
  let obj;
  try { obj = JSON.parse(line); } catch { continue; }
  const type = obj.type;
  if (type !== 'user' && type !== 'assistant') continue;

  const msg = obj.message || {};
  const role = msg.role || type;
  const content = msg.content;
  const ts = obj.timestamp ? new Date(obj.timestamp).toLocaleString('zh-CN') : '';

  if (role === 'user') {
    let text = '';
    if (typeof content === 'string') {
      text = content;
    } else if (Array.isArray(content)) {
      text = content.filter(b => b.type === 'text').map(b => b.text).join('\n');
      if (!text && content.some(b => b.type === 'tool_result')) continue;
    }
    if (!text.trim()) continue;
    if (text.startsWith('<system-reminder>')) continue;
    userCount++;
    md.push('## 用户 #' + userCount);
    md.push('');
    md.push('> ' + ts);
    md.push('');
    md.push(text);
    md.push('');
  } else if (role === 'assistant') {
    if (!Array.isArray(content)) continue;
    assistantCount++;
    for (const block of content) {
      if (block.type === 'text' && block.text && block.text.trim()) {
        md.push('### 助手回复');
        md.push('');
        md.push('> ' + ts);
        md.push('');
        md.push(block.text);
        md.push('');
      } else if (block.type === 'thinking' && block.thinking && block.thinking.trim()) {
        md.push('<details><summary>思考过程</summary>');
        md.push('');
        md.push(block.thinking);
        md.push('');
        md.push('</details>');
        md.push('');
      } else if (block.type === 'tool_use') {
        toolCount++;
        const toolName = block.name || 'unknown';
        const input = block.input || {};
        let summary = '';
        if (toolName === 'Bash') {
          summary = (input.command || '').substring(0, 120);
        } else if (['Read','Write','Edit'].includes(toolName)) {
          summary = input.file_path || '';
        } else if (['Grep','Glob'].includes(toolName)) {
          summary = input.pattern || '';
        } else if (toolName === 'Agent') {
          summary = input.description || input.subagent_type || '';
        } else {
          summary = JSON.stringify(input).substring(0, 120);
        }
        md.push('<details><summary>工具调用 #' + toolCount + ': ' + toolName + ' — ' + summary + '</summary>');
        md.push('');
        md.push('```json');
        md.push(JSON.stringify(input, null, 2));
        md.push('```');
        md.push('</details>');
        md.push('');
      }
    }
  }
}

md.push('---');
md.push('');
md.push('## 统计信息');
md.push('');
md.push('- 用户消息: ' + userCount + ' 条');
md.push('- 助手回复: ' + assistantCount + ' 条');
md.push('- 工具调用: ' + toolCount + ' 次');

const output = md.join('\n');
const outPath = path.join('D:', 'Code', 'test-ai', 'test-ai', 'chat-ai.md');
fs.writeFileSync(outPath, output, 'utf-8');
console.log('已导出到: ' + outPath);
console.log('文件大小: ' + (fs.statSync(outPath).size / 1024).toFixed(1) + ' KB');
console.log('用户消息: ' + userCount + ' 条, 助手回复: ' + assistantCount + ' 条, 工具调用: ' + toolCount + ' 次');

import { copyFile, mkdir, readFile } from 'node:fs/promises';
const html = await readFile('index.html','utf8');
for (const token of ['id="support"','id="request-form"','id="requests"']) if (!html.includes(token)) throw new Error(`Missing required section: ${token}`);
await mkdir('dist',{recursive:true});
for (const name of ['index.html','styles.css','app.mjs','support.mjs']) await copyFile(name,`dist/${name}`);
console.log('Build succeeded: static website copied to dist/');

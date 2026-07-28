#!/usr/bin/env node
// Low-cost smoke test: parse inline scripts + verify node routing covers all NODE_DATA actions.
const fs = require('fs');
const vm = require('vm');
const html = fs.readFileSync('simulator.html','utf8');
const nodeDataSource = fs.readFileSync('assets/js/map-node-data.js','utf8');
const nodeInfoSource = fs.readFileSync('assets/js/map-node-info.js','utf8');

// Parse inline scripts with Node syntax check via vm.Script.
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.forEach((code,i)=>{ new vm.Script(code, { filename:`inline-${i}.js` }); });
new vm.Script(nodeDataSource, { filename:'assets/js/map-node-data.js' });
new vm.Script(nodeInfoSource, { filename:'assets/js/map-node-info.js' });

// Extract NODE_DATA keys/actions.
const nodeDataMatch = nodeDataSource.match(/var NODE_DATA = \{([\s\S]*?)\n\};/);
if(!nodeDataMatch) throw new Error('NODE_DATA not found');
const body = nodeDataMatch[1];
const actions = [...body.matchAll(/\n\s*(\w+):\s*\{[^}]*?action:'([^']+)'/g)].map(m=>({node:m[1], action:m[2]}));
if(!actions.length) throw new Error('No NODE_DATA actions found');

const routeBlock = nodeInfoSource.match(/function enterNodeAction\(data\) \{([\s\S]*?)\n  \}/)?.[1] || '';
const missing = actions.filter(x => !routeBlock.includes(`data.action === '${x.action}'`));
if(missing.length){
  throw new Error('Missing enterNodeAction routes: '+missing.map(x=>`${x.node}:${x.action}`).join(', '));
}

if(!nodeInfoSource.includes('function enterNode()') || !nodeInfoSource.includes('enterNodeAction(data)')){
  throw new Error('enterNode no longer delegates to enterNodeAction');
}

// Confirm required map scripts are loaded.
if(!html.includes('assets/js/map-node-data.js')) throw new Error('map-node-data.js not loaded');
if(!html.includes('assets/js/map-node-info.js')) throw new Error('map-node-info.js not loaded');
if(!html.includes('assets/js/scene-first.js')) throw new Error('scene-first.js not loaded');

console.log('smoke-nodes OK:', actions.map(x=>x.node).join(', '));

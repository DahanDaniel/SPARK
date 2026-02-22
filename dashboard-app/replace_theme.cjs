const fs = require('fs');
const path = require('path');

const dir = '/Users/danieldahan/Programming/SPARK/dashboard-app/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'GlobalFilters.jsx'); 
// Left out GlobalFilters as I already manually mapped its variables

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Replace text-white except inside var() or custom stuff if any, but it's safe for Tailwind classes
  content = content.replace(/text-white/g, 'text-[var(--color-text-primary)]');
  
  // Replace borders
  content = content.replace(/border-white\/(5|10|20|30)/g, 'border-[var(--color-glass-border)]');
  
  // Replace bgs
  content = content.replace(/bg-white\/(5|10|15)/g, 'bg-[var(--color-glass-bg)]');
  content = content.replace(/bg-black\/(20|40)/g, 'bg-[var(--color-glass-bg)]');
  
  // Funnel tooltip cursor
  content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'var(--color-glass-bg)');
  
  fs.writeFileSync(path.join(dir, file), content);
});

// Fix Dashboard wrapper which still had bg-bento-bg mapped without var
let dashContent = fs.readFileSync(path.join(dir, 'Dashboard.jsx'), 'utf8');
dashContent = dashContent.replace(/bg-bento-bg/g, 'bg-[var(--color-bento-bg)]');
fs.writeFileSync(path.join(dir, 'Dashboard.jsx'), dashContent);

console.log("Replacement complete.");

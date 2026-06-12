const fs = require('fs');
const path = require('path');
const r = String.fromCharCode(0xFFFD);
const replacements = [
    [r + String.fromCharCode(0x2014), '—'],
    [r + '-' + r, '⚙️'],
    [r + 'Y"S', '📊'],
    [r + 'Y"<', '📊'],
    [r + 'Y"^', '📈'],
    [r + 'Y"-', '🔗'],
    [r + 'z ', '💠 '],
    [r + 'Y"' + r, '⚡'],
    [r + 's' + r, '⚡'],
    [r + 'YY' + r, '📦'],
    [r + 'Y\'' + r, '💱'],
    [r + 'Y""', '🔔'],
    [r + 'Y-' + r, '🖨️'],
    [r + 'Y",', '📤'],
    [r + 'Y"', '📁'],
    [r + 'Y\'', '👤'],
    [r + '~.', '⭐'],
    [r + 'YZ', '🖥️'],
    [r + 'Y"\'', '🔒'],
    [r + 'o"', '🛡️'],
    [r + 'Y-\'', '🧹'],
    [r + 'Y>', '🐛'],
    [r + 'Y', '🏠'],
    [r + r + r, '—'],
    [r + r, '—'],
    [r + '-', '—'],
    [r, '—'],
    [String.fromCharCode(0x00A3), '£'],
    [String.fromCharCode(0x00A5), '¥'],
    [String.fromCharCode(0x00B7), '·'],
    [String.fromCharCode(0x00BB), '»'],
    ['?', '₿'],
    ['-"', '—']
];

const files = ['settings.html','profile.html','favorites.html','tx-detail.html','search.html','coin.html','home.html','wallet.html'];
const portalDir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

files.forEach(f => {
    let p = path.join(portalDir, f);
    let content = fs.readFileSync(p, 'utf8');
    for (let [find, rep] of replacements) {
        content = content.split(find).join(rep);
    }
    content = content.replace(/EUR \([^\)]+\)/g, 'EUR (€)');
    content = content.replace(/BTC \([^\)]+\)/g, 'BTC (₿)');
    content = content.replace(/Price — Circulating/g, 'Price × Circulating');
    content = content.replace(/Price — Max/g, 'Price × Max');
    content = content.replace(/>—</g, '>₿<');  // Fix the logo area
    
    fs.writeFileSync(p, content, 'utf8');
});
console.log('Done fixing encoding via Node');
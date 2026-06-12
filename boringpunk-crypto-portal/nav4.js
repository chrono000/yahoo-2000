const fs = require('fs');
const path = require('path');
const file = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal/coin.html';

let c = fs.readFileSync(file, 'utf8');

// 1. Process sidebar links
const mappings = {
    'Overview': 'overview',
    'Key Metrics': 'metrics',
    'Supply & Tokenomics': 'supply',
    'Comparison Table': 'comparison',
    'Your Position': 'position',
    'Technical Levels': 'technical',
    'Network Data': 'network',
    'Analysis Notes': 'notes'
};

for (const [title, id] of Object.entries(mappings)) {
    // Replace sidebar link
    const regexLink = new RegExp('<a href="[^"]*">▪ ' + title.replace(/&/g, '&amp;') + '</a>', 'g');
    c = c.replace(regexLink, '<a href="#' + id + '">» ' + title + '</a>');
    
    // Sometimes it might just be the text if the ▪ got replaced differently
    const regexLinkFallback = new RegExp('<a href="[^"]*">.*?' + title.replace(/&/g, '&amp;') + '</a>', 'g');
    c = c.replace(regexLinkFallback, '<a href="#' + id + '">» ' + title + '</a>');

    // Replace h2 tag
    // e.g. <h2>Key Metrics</h2> -> <h2 id="metrics">Key Metrics</h2>
    // But Comparison Table has extra text: <h2>Comparison Table — Top Layer 1 Assets</h2>
    if (title === 'Comparison Table') {
        c = c.replace(/<h2>Comparison Table.*?<\/h2>/, '<h2 id="' + id + '">Comparison Table — Top Layer 1 Assets</h2>');
    } else {
        const regexH2 = new RegExp('<h2>' + title.replace(/&/g, '&amp;') + '<\\/h2>');
        c = c.replace(regexH2, '<h2 id="' + id + '">' + title + '</h2>');
    }
}

fs.writeFileSync(file, c, 'utf8');
console.log('coin.html intra-page navigation implemented.');
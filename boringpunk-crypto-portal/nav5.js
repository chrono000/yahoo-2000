const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const fullPath = path.join(dir, file);
    let c = fs.readFileSync(fullPath, 'utf8');
    
    // Replace sidebar link
    c = c.replace(/href="#"([^>]*>💱 New [tT]rade)/g, 'href="markets.html"');
    
    // Special check for wallet.html which has <span class="tbtn primary">...
    // Actually wait, wallet uses a span, let's fix it to be an anchor tag too.
    if (file === 'wallet.html') {
        c = c.replace(/<span class="tbtn primary"><span class="ic">💱<\/span> New Trade<\/span>/g, '<a href="markets.html" class="tbtn primary" style="text-decoration:none;"><span class="ic">💱</span> New Trade</a>');
    }

    fs.writeFileSync(fullPath, c, 'utf8');
});
console.log('Rewired Trade links.');
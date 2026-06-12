const fs = require('fs');
const path = require('path');
const r = String.fromCharCode(0xFFFD);
const files = ['settings.html','profile.html','favorites.html','tx-detail.html','search.html','coin.html','home.html','wallet.html'];
const portalDir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

files.forEach(f => {
    let p = path.join(portalDir, f);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/—"/g, '—');
    fs.writeFileSync(p, content, 'utf8');
});
console.log('Cleanup step done.');
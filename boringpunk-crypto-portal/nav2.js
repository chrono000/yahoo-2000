const fs = require('fs');
const path = require('path');
const files = ['settings.html','profile.html','favorites.html','tx-detail.html','search.html','coin.html','home.html','wallet.html','markets.html','transactions.html'];
const portalDir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

files.forEach(f => {
    let p = path.join(portalDir, f);
    let content = fs.readFileSync(p, 'utf8');

    // Replace ANY empty <a> tags with <a href="#">
    // But be careful not to replace <a> inside <span class="tab"> that are active? 
    // Actually, <a class="current">...</a> or <a>...</a>. Let's do a regex that finds <a> without href.
    content = content.replace(/<a(?! href|\s+class)([^>]*)>/g, '<a href="#">');
    content = content.replace(/<a class="current"/g, '<a href="#" class="current"');

    fs.writeFileSync(p, content, 'utf8');
});
console.log('Navigation wiring step 2 empty links done.');
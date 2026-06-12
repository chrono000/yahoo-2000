const fs = require('fs');
const path = require('path');
const r = String.fromCharCode(0xFFFD);
const files = ['settings.html','profile.html','favorites.html','tx-detail.html','search.html','coin.html','home.html','wallet.html'];
const portalDir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

files.forEach(f => {
    let p = path.join(portalDir, f);
    let content = fs.readFileSync(p, 'utf8');

    // Restore the logo specifically
    content = content.replace(new RegExp('<div class="logo">' + r + '</div>', 'g'), '<div class="logo">₿</div>');
    
    // Replace all remaining mojibake clusters with a 2000s bullet: ▪
    // A cluster is 1 or more FFFD, optionally followed by a few ASCII garbage chars from the misdecoding.
    // ASCII garbage observed: O, S, Z, z, s, T, Y, -, ', ", ., ~, ^, <, > (wait, < and > might be HTML tags, let's exclude < and >)
    // Actually, the regex should be: one or more FFFD, followed by 0-3 chars of [a-zA-Z0-9"'\-\.\~^\?]
    let regex = new RegExp(r + '+[a-zA-Z0-9"\'\\-\\.\\~\\^\\?]{0,3}', 'g');
    content = content.replace(regex, '▪');
    
    // Some lines had multiple FFFDs separated by -, like FFFD - FFFD. Let's just catch any remaining FFFD 
    content = content.replace(new RegExp(r, 'g'), '▪');

    fs.writeFileSync(p, content, 'utf8');
});
console.log('Final encoding wipe complete.');
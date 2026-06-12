const fs = require('fs');
const path = require('path');
const files = ['settings.html','profile.html','favorites.html','tx-detail.html','search.html','coin.html','home.html','wallet.html','markets.html','transactions.html'];
const portalDir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

files.forEach(f => {
    let p = path.join(portalDir, f);
    let content = fs.readFileSync(p, 'utf8');

    // 1. Banner links
    content = content.replace(/<a>My Profile<\/a>/g, '<a href="profile.html">My Profile</a>');
    content = content.replace(/<a>Sign Out<\/a>/g, '<a href="home.html">Sign Out</a>');
    
    // 2. Subnav links (some are already wrapped in spans like <span class="tab"><a>Home</a></span>)
    // we need to be careful. The subnav is mostly: <span class="tab"><a href="...">Home</a></span>
    // But let's universally fix unlinked <a>Home</a> to <a href="home.html">Home</a> in the subnav context if missed.
    
    // 3. Tree/Sidebar links - find <a>Home Dashboard</a>, etc
    content = content.replace(/<a>🏠 Home Dashboard<\/a>/g, '<a href="home.html">🏠 Home Dashboard</a>');
    content = content.replace(/<a>👤 My Profile<\/a>/g, '<a href="profile.html">👤 My Profile</a>');
    content = content.replace(/<a>📁 My Wallets<\/a>/g, '<a href="wallet.html">📁 My Wallets</a>');
    content = content.replace(/<a>📊 Markets<\/a>/g, '<a href="markets.html">📊 Markets</a>');
    content = content.replace(/<a>📋 Transactions<\/a>/g, '<a href="transactions.html">📋 Transactions</a>');
    content = content.replace(/<a>⚙️ General Settings<\/a>/g, '<a href="settings.html">⚙️ General Settings</a>');

    // Make action links href="#"
    content = content.replace(/<a>📞 Contact Support<\/a>/g, '<a href="#">📞 Contact Support</a>');
    content = content.replace(/<a>📄 Documentation<\/a>/g, '<a href="#">📄 Documentation</a>');
    content = content.replace(/<a>🐛 Report a Bug<\/a>/g, '<a href="#">🐛 Report a Bug</a>');
    content = content.replace(/<a>📤 Export CSV<\/a>/g, '<a href="#">📤 Export CSV</a>');
    content = content.replace(/<a>📤 Export JSON<\/a>/g, '<a href="#">📤 Export JSON</a>');
    content = content.replace(/<a>🖨️ Print report<\/a>/g, '<a href="#">🖨️ Print report</a>');
    
    fs.writeFileSync(p, content, 'utf8');
});
console.log('Navigation wiring step 1 done.');
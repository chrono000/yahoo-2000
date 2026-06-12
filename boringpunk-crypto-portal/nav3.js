const fs = require('fs');
const path = require('path');
const portalDir = 'c:/Users/USER/Desktop/anti-grav 01 test fold/boringpunk-crypto-portal';

const quickLinks = `
    <div class="webpart">
      <div class="webpart-header"><span>🔗 Quick Links</span></div>
      <div class="webpart-body" style="font-size:11px;line-height:1.9;">
        <a href="home.html">🏠 Home Dashboard</a><br/>
        <a href="profile.html">👤 My Profile</a><br/>
        <a href="wallet.html">📁 My Wallets</a><br/>
        <a href="#">📞 Contact Support</a><br/>
        <a href="#">📄 Documentation</a><br/>
        <a href="#">🐛 Report a Bug</a>
      </div>
    </div>
  </div>`; // Closing div for right-col

['coin.html', 'search.html'].forEach(f => {
    let p = path.join(portalDir, f);
    let c = fs.readFileSync(p, 'utf8');
    
    if (!c.includes('🔗 Quick Links')) {
        // Find the end of the right-col. We know the files end with:
        //   </div>
        // </div>
        // <div class="footer">
        
        c = c.replace(/  <\/div>([\s\n]*<\/div>[\s\n]*<div class="footer">)/, quickLinks + '$1');
        fs.writeFileSync(p, c, 'utf8');
    }
});
console.log('Appended Quick Links to right sidebar in coin and search');
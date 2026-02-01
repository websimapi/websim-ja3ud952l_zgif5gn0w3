// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        link.classList.add('active');
        
        // Show target section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Scroll to top on mobile
        window.scrollTo(0, 0);
    });
});

// Copy all docs button
const copyDocsBtn = document.getElementById('copy-docs-btn');
if (copyDocsBtn) {
    copyDocsBtn.addEventListener('click', () => {
        const sections = document.querySelectorAll('.section');
        let fullText = "SYSTEM DOCUMENTATION\n\n";
        
        sections.forEach(sec => {
            const id = sec.id;
            // Get section title
            const title = sec.querySelector('h2')?.textContent || id.toUpperCase();
            fullText += `\n\n=== ${title} ===\n`;
            
            // Get content cards
            sec.querySelectorAll('.card').forEach(card => {
                const cardTitle = card.querySelector('h3')?.textContent;
                if (cardTitle) fullText += `\n[ ${cardTitle} ]\n`;
                
                // Get clean text content (clone to avoid modifying DOM)
                const clone = card.cloneNode(true);
                // Remove the title from clone so it's not duplicated
                const h3 = clone.querySelector('h3');
                if (h3) h3.remove();
                
                fullText += clone.textContent.trim() + "\n";
            });
        });
        
        navigator.clipboard.writeText(fullText).then(() => {
            const originalText = copyDocsBtn.textContent;
            copyDocsBtn.textContent = 'Copied!';
            copyDocsBtn.style.background = '#4CAF50';
            copyDocsBtn.style.borderColor = '#4CAF50';
            
            setTimeout(() => {
                copyDocsBtn.textContent = originalText;
                copyDocsBtn.style.background = '';
                copyDocsBtn.style.borderColor = '';
            }, 2000);
        });
    });
}

// Highlight code blocks
document.querySelectorAll('pre code').forEach(block => {
    // Simple syntax highlighting for SEARCH/REPLACE markers
    let html = block.innerHTML;
    html = html.replace(/(&lt;&lt;&lt;&lt;&lt;&lt;&lt; SEARCH|=======|&gt;&gt;&gt;&gt;&gt;&gt;&gt; REPLACE)/g, 
        '<span style="color: #ff9800; font-weight: bold;">$1</span>');
    block.innerHTML = html;
});

// Add copy buttons to code blocks
document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: #333;
        color: #fff;
        border: 1px solid #555;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Space Mono', monospace;
        font-size: 0.75rem;
    `;
    
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    button.addEventListener('click', () => {
        const code = pre.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    });
});
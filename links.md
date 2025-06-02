---
layout: minimal
---
<style>
:root {
    --flexoki-bg: #100F0F;
    --flexoki-bg-alt: #F2F0E5;
    --flexoki-fg: #CECDC3;
    --flexoki-fg-alt: #100F0F;
    --flexoki-accent: #E6E4D9;
    --flexoki-link: #100F0F;
    --flexoki-link-hover: #100F0F;
    --flexoki-border: #E6E4D9;
    --flexoki-muted: #B7B5AC;
}

body {
    background-image: url('/assets/images/06_Post/Cover.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    background-color: transparent !important;
    color: var(--flexoki-fg);
}

.linktree-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
    background: transparent;
    border-radius: 16px;
    padding: 2em 1.5em;
    box-shadow: 0 4px 24px 0 rgba(24, 26, 27, 0.15);
}

.linktree-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1em;
    object-fit: cover;
    border: 2px solid var(--flexoki-border);
}

.linktree-title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0.5em;
    color: var(--flexoki-accent);
    letter-spacing: 1px;
}

.linktree-links {
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.linktree-link {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--flexoki-bg-alt);
    border-radius: 8px;
    padding: 1em;
    font-size: 1.1em;
    text-decoration: none;
    color: var(--flexoki-link);
    transition: background 0.2s, color 0.2s;
    border: 1px solid var(--flexoki-border);
    opacity: 0.92;
    font-weight: 500;
}

.linktree-link:hover {
    background: var(--flexoki-accent);
    color: var(--flexoki-bg);
    text-decoration: none;
}

.linktree-emoji {
    margin-right: 0.7em;
    font-size: 1.3em;
}

.linktree-link[style*="cursor: default;"] {
    color: var(--flexoki-muted);
    background: var(--flexoki-bg-alt);
    border: 1px dashed var(--flexoki-border);
    cursor: default;
    opacity: 0.7;
}
</style>

<div class="linktree-container">

    <!-- Optional: Add your avatar image here -->
    <!-- <img src="https://your-avatar-url.jpg" alt="Avatar" class="linktree-avatar"> -->

    <div class="linktree-title">Links</div>

    <div class="linktree-links">
        <a class="linktree-link" href="https://alllesss.com" target="_blank">
            <span class="linktree-emoji">🌐</span> ALLLESSS.com
        </a>
        <a class="linktree-link" href="https://eshraq.io" target="_blank">
            <span class="linktree-emoji">🔴</span> Devlog
        </a>
        <a class="linktree-link" href="https://instagram.com/alless0" target="_blank">
            <span class="linktree-emoji">🟠</span> Instagram
        </a>
        <a class="linktree-link" href="mailto:alless0@outlook.com">
            <span class="linktree-emoji">📬</span> alless0@outlook.com
        </a>
    </div>
</div>
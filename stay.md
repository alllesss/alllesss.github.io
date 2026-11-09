---
layout: minimal
title: Stay in touch
permalink: /stay/
share-description: "ESHRAQ is coming to Steam in Early Access. Leave your email to hear when it is out, and to get new devlogs from the process log."
css:
    - "/assets/css/beautifuljekyll.css"
---

<script>
    // This page is always dark.
    document.documentElement.classList.add('page-dark-mode');
    document.body.classList.add('page-dark-mode');
</script>

<style>
.main-content {
    padding-top: 2.5rem;
    padding-bottom: 2rem;
}

.stay {
    max-width: 540px;
    margin: 0 auto;
    text-align: center;
}

@font-face {
    font-family: 'KarimWordmark';
    src: url('/assets/fonts/KarimBold-wordmark.woff2') format('woff2');
    font-weight: 700;
    font-display: block;
}

/* The game's menu-header lockup (WBP_Header): orb 24, gap 10, ESHRAQ Barlow SemiBold 22pt,
   gap 12, Farsi Karim Bold 26pt with three kashidas. --u = one UMG unit. */
.wordmark {
    /* shrinks to fit a phone: the whole lockup is ~250 units wide */
    --u: min(1.5px, calc((100vw - 32px) / 250));
    display: inline-flex;
    align-items: center;
    margin: 0;
    color: #EFECE2;
    line-height: 1;
    direction: ltr;
}

.wordmark-orb {
    width: calc(24 * var(--u));
    height: calc(24 * var(--u));
    margin-right: calc(10 * var(--u));
}

.wordmark-latin,
.wordmark-farsi {
    color: #EFECE2;
}

.wordmark-latin {
    font-family: 'Barlow', sans-serif;
    font-weight: 600;
    font-size: calc(22 * 4 / 3 * var(--u));
    letter-spacing: 0;
}

.wordmark-farsi {
    margin-left: calc(12 * var(--u));
    font-family: 'KarimWordmark', var(--font-farsi);
    font-weight: 700;
    font-size: calc(26 * 4 / 3 * var(--u));
    direction: rtl;
}

.stay-lead {
    margin: 1.25rem auto 0;
    max-width: 30rem;
    font-size: 1.05rem;
    line-height: 1.6;
}

.stay .newsletter-container {
    margin: 1.5rem auto 0;
}

.stay-note {
    margin: 0.5rem 0 0;
    font-size: 0.85rem;
    color: #878580;
}

.stay-links {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: #878580;
}

.stay-links .sep {
    margin: 0 0.6em;
}
</style>

<div class="stay">
    <h1 class="wordmark" aria-label="ESHRAQ"><img class="wordmark-orb" src="/assets/img/eshraq-orb.png" alt=""><span class="wordmark-latin">ESHRAQ</span><span class="wordmark-farsi" lang="fa" aria-hidden="true">اشـــراق</span></h1>
    <hr class="small">

    <p class="stay-lead">ESHRAQ is coming to Steam in Early Access. Leave your email to hear when it is out, and to get new devlogs and posts from the <a href="/">process log</a> as they are published.</p>

    <div class="newsletter-container centered">
        <iframe src="https://alllesss.substack.com/embed" class="newsletter-iframe" frameborder="0" scrolling="no" title="Subscribe to the ESHRAQ newsletter on Substack"></iframe>
    </div>
    <p class="stay-note">Unsubscribe any time.</p>

    <p class="stay-links">
        <a href="/">Process log</a><span class="sep">/</span><a href="/about/">About</a><span class="sep">/</span><a href="https://instagram.com/alless0" target="_blank" rel="noopener noreferrer">@alless0</a>
    </p>
</div>

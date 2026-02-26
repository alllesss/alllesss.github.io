---
layout: minimal
css:
    - "/assets/css/beautifuljekyll.css"
---

<script>
    (function () {
        try {
            var darkMode = localStorage.getItem('bj-dark-mode');
            if (darkMode === 'false') {
                document.body.classList.remove('page-dark-mode');
                document.documentElement.classList.remove('page-dark-mode');
            } else {
                document.body.classList.add('page-dark-mode');
                document.documentElement.classList.add('page-dark-mode');
            }
        } catch (e) {
            document.body.classList.add('page-dark-mode');
            document.documentElement.classList.add('page-dark-mode');
        }
    })();
</script>

<style>
.main-content {
        padding-top: 1.5rem;
        padding-bottom: 2rem;
}

.links-wrap {
    max-width: 860px;
    margin: 0 auto 2rem;
}

.links-heading {
    margin-top: 0;
    margin-bottom: 1.5rem;
}

.links-heading .page-heading h1 {
    text-transform: uppercase;
}

.links-list {
    margin: 0;
}

.links-list .post-preview {
    min-height: 6.25rem;
    display: flex;
    align-items: center;
}

@media (min-width: 768px) {
    .links-list .post-preview {
        min-height: 7rem;
    }
}

.links-list .post-title {
    margin-bottom: 0;
    font-size: 1.25rem;
    line-height: 1.38;
    display: inline-flex;
    align-items: center;
}

.links-list .post-preview.has-subtitle .post-title {
    margin-bottom: 0.35rem;
}

.links-list .post-preview.has-subtitle .post-subtitle {
    color: #6F6E69;
    font-size: 1rem;
    font-style: italic;
    font-family: var(--font-ui);
    font-weight: 400;
    line-height: 1.55;
    margin-bottom: 0;
    padding-left: calc(1.35em + 0.9rem);
}

.link-prefix {
    width: 1.35em;
    margin-right: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #878580;
    line-height: 1;
}

.link-icon {
    width: 1.1em;
    height: 1.1em;
    fill: currentColor;
    display: inline-block;
    vertical-align: middle;
}

.link-icon-img {
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    object-fit: cover;
    display: inline-block;
    vertical-align: middle;
}

.link-favicon {
    width: 1.1em;
    height: 1.1em;
    border-radius: 0.2em;
    object-fit: cover;
    display: inline-block;
    vertical-align: middle;
}

.post-preview:hover .link-prefix,
.post-preview:focus-within .link-prefix {
    color: #403E3C;
}

.page-dark-mode .links-list .post-preview a:hover,
.page-dark-mode .links-list .post-preview a:focus {
    color: #BC5215;
}

.page-dark-mode .links-list .post-title {
    color: #878580;
}

.page-dark-mode .links-list .post-preview:hover .post-title,
.page-dark-mode .links-list .post-preview:focus-within .post-title {
    color: #BC5215;
}

.page-dark-mode .links-list .post-preview:hover .link-prefix,
.page-dark-mode .links-list .post-preview:focus-within .link-prefix {
    color: #BC5215;
}
</style>

<div class="links-wrap">
    <div class="intro-header links-heading">
        <div class="container-md">
            <div class="row">
                <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                    <div class="page-heading">
                        <h1>Links</h1>
                        <span class="page-subheading">find me around the web</span>
                        <hr class="small">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <ul class="posts-list links-list list-unstyled" role="list">
        <li class="post-preview spotlight-target">
            <a class="post-preview-link" href="https://www.eshraq.io/about/" target="_blank" rel="noopener noreferrer">
                <article>
                    <h2 class="post-title"><span class="link-prefix"><svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1 2v14h14V5H5Zm2 2h6v2H7V7Zm0 4h10v2H7v-2Zm0 4h10v2H7v-2Z"/></svg></span>Subscribe to Newsletter</h2>
                </article>
            </a>
        </li>
        <li class="post-preview spotlight-target has-subtitle">
            <a class="post-preview-link" href="https://alllesss.com" target="_blank" rel="noopener noreferrer">
                <article>
                    <h2 class="post-title"><span class="link-prefix"><img class="link-favicon" src="/assets/img/alllesss.com-favicon.ico" alt=""></span>ALLLESSS.com</h2>
                    <h3 class="post-subtitle">Works</h3>
                </article>
            </a>
        </li>
        <li class="post-preview spotlight-target has-subtitle">
            <a class="post-preview-link" href="https://eshraq.io" target="_blank" rel="noopener noreferrer">
                <article>
                    <h2 class="post-title"><span class="link-prefix"><img class="link-favicon" src="https://www.eshraq.io/favicon.ico" alt=""></span>ESHRAQ.io</h2>
                    <h3 class="post-subtitle">Process Log</h3>
                </article>
            </a>
        </li>
        <li class="post-preview spotlight-target">
            <a class="post-preview-link" href="https://instagram.com/alless0" target="_blank" rel="noopener noreferrer">
                <article>
                    <h2 class="post-title"><span class="link-prefix"><svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.75 2h8.5C19.43 2 22 4.57 22 7.75v8.5C22 19.43 19.43 22 16.25 22h-8.5C4.57 22 2 19.43 2 16.25v-8.5C2 4.57 4.57 2 7.75 2Zm-.2 2A3.55 3.55 0 0 0 4 7.55v8.9A3.55 3.55 0 0 0 7.55 20h8.9A3.55 3.55 0 0 0 20 16.45v-8.9A3.55 3.55 0 0 0 16.45 4h-8.9ZM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg></span>@alless0</h2>
                </article>
            </a>
        </li>
        <li class="post-preview spotlight-target">
            <a class="post-preview-link" href="mailto:alless0@outlook.com">
                <article>
                    <h2 class="post-title"><span class="link-prefix"><svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.51l9 5.4 9-5.4V7l-9 5.4L3 7.01ZM4 17h16V9.31l-7.5 4.5a1 1 0 0 1-1.03 0L4 9.31V17Z"/></svg></span>alless0@outlook.com</h2>
                </article>
            </a>
        </li>
    </ul>
</div>
async function carregarLayout() {
    // 1. Injeta o layout.css automaticamente no <head> da página
    const linkCss = document.createElement("link");
    linkCss.rel = "stylesheet";
    linkCss.href = "../layouts/layout.css";
    document.head.appendChild(linkCss);

    // 2. Procura os elementos com class="header" e class="footer"
    const headerEl = document.querySelector(".header");
    const footerEl = document.querySelector(".footer");

    // 3. Carrega e insere o HTML do header
    if (headerEl) {
        const respostaHeader = await fetch("../layouts/header.html");
        headerEl.innerHTML = await respostaHeader.text();
    }

    // 4. Carrega e insere o HTML do footer
    if (footerEl) {
        const respostaFooter = await fetch("../layouts/footer.html");
        footerEl.innerHTML = await respostaFooter.text();
    }
}

carregarLayout();
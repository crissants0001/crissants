# 🚀 FleetControl Suite - Premium Showcase

Um website estático premium desenvolvido em **Next.js (App Router)** para apresentar o sistema de gestão corporativa FleetControl. 

A interface possui design Dark Premium, influenciado pelas maiores empresas SaaS do mundo (Stripe, Vercel, Linear), aplicando conceitos profundos de UX/UI, Glassmorphism e microinterações com Framer Motion.

## 🌟 Destaques
- **Design de Elite:** Tipografia moderna, cores exatas (`#111111`, `#ff6b2d`), sombras suaves e blur.
- **Animações Fluidas:** Framer Motion (Fade, Slide, Scale, Parallax, Count Up).
- **Galeria Dinâmica:** Leitura automática via Node `fs` das screenshots dentro da pasta `public/screenshots/`.
- **Performance:** Componentização estrita, CSS Modules e Lazy Loading nativo.

## 🛠️ Tecnologias
- **Framework:** Next.js 14 (App Router)
- **Linguagem:** JavaScript Moderno (ES6+)
- **Estilização:** CSS Modules
- **Animações:** Framer Motion
- **Ícones:** React Icons
- **Carrossel/Gráficos:** SwiperJS, Chart.js (Opcionais nos módulos expandidos)

## 📦 Estrutura do Projeto
```text
├── app/
│   ├── layout.js
│   ├── page.js
│   └── prints/
│       └── page.js
├── components/
│   ├── Footer.jsx
│   ├── HomeSections.jsx
│   ├── Navbar.jsx
│   └── PrintsGallery.jsx
├── styles/
│   ├── globals.css
│   └── components.module.css
├── public/
│   └── screenshots/ (Adicione suas imagens aqui)
├── package.json
└── README.md
# SSG Exercise (Eleventy)

Builds two pages (contact.html and index.html) that share one footer
from `_includes/footer.html`.

## Install
npm install

## Build
npx @11ty/eleventy

## Preview locally
npx @11ty/eleventy --serve
Open the local address printed in the terminal
and visit both pages:
- Index: '/' (EX: localhost:8080/index)
- Contact: '/contact/' (EX: localhost:8080/contact/)

## Shared section
Edit `_includes/footer.html`, rebuild, and both pages update.
# PPF Changelogs — Atualizações Rede RWP

Site estático de changelog do **Rede RWP / Pizza Pizza**, com o mesmo visual (tokens, tipografia e tema claro/escuro) do RederWP.

## Como funciona

Todas as atualizações ficam em:

```
public/data/atualizacoes.json
```

| Campo       | Descrição               |
|-------------|-------------------------|
| `tema`      | Título da atualização   |
| `descricao` | O que foi feito         |
| `data`      | Data ISO (`YYYY-MM-DD`) |

O site ordena pelas datas mais recentes primeiro.

## Desenvolvimento

```bash
npm start
```

Abra `http://localhost:4200/`.

## Build (Hostinger)

```bash
npm run build
```

Saída pronta para hospedagem estática (Apache):

```
dist/
  index.html
  .htaccess
  data/atualizacoes.json
  *.js / *.css
```

### Configuração na Hostinger (Deployments / Git)

Use deploy **estático** (não Node.js / não SSR):

1. **Comando de build:** `npm run build`
2. **Diretório de saída (Output directory):** `dist`
3. **NÃO** use Node.js app nem comando `start` em produção

Se aparecer **403 Forbidden** (“Access to this resource on the server is denied!”), em geral o `index.html` não está na raiz do site publicado — confira se o output é exatamente `dist` (sem `/browser` e sem `dist/ppf-changelogs`).

O `.htaccess` já define `DirectoryIndex index.html` (necessário na Hostinger, onde o padrão costuma ser só `index.php`).

## Tema

O botão sol/lua usa a chave `localStorage` `rwp-theme` (igual ao RederWP).

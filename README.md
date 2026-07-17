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

Saída pronta para hospedagem estática:

```
dist/ppf-changelogs/
  index.html
  .htaccess
  data/atualizacoes.json
  *.js / *.css
```

### Configuração na Hostinger (Deployments)

1. **Comando de build:** `npm run build`
2. **Diretório de saída (Output directory):** `dist/ppf-changelogs`
3. **NÃO** use Node/SSR — o site é 100% estático (HTML/CSS/JS)

Se o domínio continuar em **403 Forbidden**, quase sempre é porque o deploy estava apontando para a pasta do repositório ou para `dist/ppf-changelogs` com subpasta `browser`/`server` (build SSR antigo). Após este ajuste, o `index.html` fica **na raiz** de `dist/ppf-changelogs`.

## Tema

O botão sol/lua usa a chave `localStorage` `rwp-theme` (igual ao RederWP).

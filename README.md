# Skill Forge / Cibersec

Este repositorio e um monorepo com pnpm. O app principal para deploy esta em
`artifacts/cibersec` e o pacote dele se chama `@workspace/cibersec`.

O deploy recomendado e pelo GitHub conectado na Vercel. Depois da primeira
configuracao, cada `git push` na branch principal gera um novo deploy
automaticamente.

## Pre-requisitos

- Node.js instalado.
- pnpm instalado. Se estiver usando Corepack:

```powershell
corepack enable
```

- Git instalado e disponivel no terminal:

```powershell
git --version
```

- Uma conta no GitHub e uma conta na Vercel.

No Windows, instalar o Git for Windows tambem ajuda porque este projeto usa um
script de `preinstall` que chama `sh`.

## Instalar dependencias

Rode os comandos a partir da raiz do repositorio:

```powershell
pnpm install
```

## Rodar localmente

O `vite.config.ts` exige as variaveis `PORT` e `BASE_PATH`. No PowerShell:

```powershell
$env:PORT="3000"
$env:BASE_PATH="/"
pnpm --filter @workspace/cibersec dev
```

Abra:

```text
http://localhost:3000
```

## Gerar build local

No PowerShell:

```powershell
$env:PORT="3000"
$env:BASE_PATH="/"
pnpm --filter @workspace/cibersec build
```

O build final sera criado em:

```text
artifacts/cibersec/dist/public
```

Em terminal bash/macOS/Linux, o mesmo comando pode ser rodado assim:

```bash
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/cibersec build
```

## Subir para o GitHub

Se o repositorio ainda nao foi iniciado com Git:

```powershell
git init
git branch -M main
git add .
git commit -m "Adicionar projeto"
```

Crie um repositorio vazio no GitHub, sem README, sem `.gitignore` e sem license
automaticos. Depois conecte o remoto:

```powershell
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

Se o remoto ja existe, confira:

```powershell
git remote -v
```

Para trocar o remoto:

```powershell
git remote set-url origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

Depois disso, o fluxo normal e:

```powershell
git add .
git commit -m "Descrever alteracao"
git push
```

## Deploy na Vercel pelo painel

1. Suba o codigo para o GitHub.
2. Entre em https://vercel.com.
3. Clique em `Add New...` e depois `Project`.
4. Importe o repositorio do GitHub.
5. Configure o projeto assim:

```text
Framework Preset: Vite
Root Directory: .  (raiz do repositorio)
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm --filter @workspace/cibersec build
Output Directory: artifacts/cibersec/dist/public
```

Nao coloque `artifacts/cibersec` como `Root Directory`, porque o app depende do
workspace pnpm da raiz e de pacotes locais em `lib/*`.

6. Em `Environment Variables`, adicione:

```text
BASE_PATH=/
PORT=3000
```

7. Clique em `Deploy`.

Quando o deploy terminar, a Vercel vai mostrar uma URL parecida com:

```text
https://nome-do-projeto.vercel.app
```

## Deploy pela Vercel CLI

Tambem da para fazer pelo terminal:

```powershell
pnpm dlx vercel login
pnpm dlx vercel
```

Na primeira execucao, responda as perguntas usando a raiz do repositorio e as
mesmas configuracoes:

```text
Framework Preset: Vite
Build Command: pnpm --filter @workspace/cibersec build
Output Directory: artifacts/cibersec/dist/public
Environment Variables: BASE_PATH=/ e PORT=3000
```

Para publicar em producao:

```powershell
pnpm dlx vercel --prod
```

## Rotas internas na Vercel

Este app usa roteamento no navegador. Se uma rota como `/dia/1`, `/busca` ou
`/admin` abrir normalmente pelo clique, mas der 404 ao atualizar a pagina, crie
um arquivo `vercel.json` na raiz com:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "installCommand": "pnpm install --frozen-lockfile",
  "buildCommand": "pnpm --filter @workspace/cibersec build",
  "outputDirectory": "artifacts/cibersec/dist/public",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Depois faca commit e push:

```powershell
git add vercel.json
git commit -m "Configurar deploy na Vercel"
git push
```

## Problemas comuns

### `git` nao e reconhecido

Instale o Git for Windows, feche e abra o terminal novamente, e rode:

```powershell
git --version
```

### `pnpm` nao e reconhecido

Ative o Corepack:

```powershell
corepack enable
```

Depois feche e abra o terminal. Se ainda nao funcionar:

```powershell
npm install -g pnpm
```

### Erro dizendo que `PORT` ou `BASE_PATH` nao existe

Defina as variaveis antes de rodar `dev` ou `build`. Na Vercel, cadastre as duas
em `Settings > Environment Variables`:

```text
PORT=3000
BASE_PATH=/
```

### Output Directory nao encontrado

Confirme se o build command esta exatamente assim:

```text
pnpm --filter @workspace/cibersec build
```

E se o output directory esta exatamente assim:

```text
artifacts/cibersec/dist/public
```

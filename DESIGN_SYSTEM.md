# Design System - Vigiante Front

## Resumo do Design System

### Primary Color
- **Cor:** Laranja Vibrante
- **Hex:** `#FF8000`
- **OKLCH:** `oklch(67% 0.165 67)`
- **Uso:** Cor principal da marca, usada para elementos interativos, destaques e ações primárias

### Font
- **Família:** Geist Sans
- **Pesos:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Estilo:** Moderno, limpo, altamente legível

### Style
- **Estilo Geral:** Moderno Minimalista
- **Características:** Limpo, funcional, focado na clareza e legibilidade
- **Sensação:** Profissional, intuitivo, leve, com toque vibrante de laranja

### Border Radius
- **Padrão:** `0.625rem` (10px)
- **Estilo:** Arredondado médio
- **Variações:**
  - Small: `0.25rem` (4px)
  - Medium: `0.5rem` (8px)
  - Large: `1rem` (16px)
  - XLarge: `1.5rem` (24px)
  - Full: `9999px` (pill)

### Spacing
- **Ritmo:** Normal/Relaxed
- **Base:** Sistema de espaçamento do Tailwind CSS (4px/8px)
- **Características:** Bom uso de espaço em branco, separação clara entre elementos

### Shadows
- **Estilo:** Subtle (Sutil)
- **Uso:** Sombras discretas para dar profundidade e indicar elevação
- **Aplicação:** Cards, dropdowns, controles do mapa

### Cores Semânticas

#### Success
- **OKLCH:** `oklch(55% 0.15 140)`
- **Hex:** `#4CAF50`
- **Uso:** Indicadores de sucesso, confirmações positivas

#### Warning
- **OKLCH:** `oklch(85% 0.12 90)`
- **Hex:** `#FFC107`
- **Uso:** Avisos, alertas que requerem atenção

#### Destructive/Error
- **OKLCH:** `oklch(0.577 0.245 27.325)`
- **Uso:** Erros, ações destrutivas, alertas críticos

#### Info
- **OKLCH:** `oklch(50% 0.1 260)`
- **Hex:** `#2196F3`
- **Uso:** Informações, mensagens informativas

### Dark Mode
- **Suportado:** Sim
- **Estratégia:** Inversão de valores de luz/escuridão mantendo contraste adequado
- **Toggle:** Disponível na página de Design Tokens

## Estrutura do Projeto

```
src/
├── app/
│   ├── styleguide/
│   │   ├── styleguide.component.ts
│   │   ├── styleguide.component.html
│   │   ├── styleguide.component.scss
│   │   ├── navigation.config.ts
│   │   └── pages/
│   │       ├── tokens/
│   │       │   ├── tokens.component.ts
│   │       │   ├── tokens.component.html
│   │       │   └── tokens.component.scss
│   │       └── component-detail/
│   │           └── component-detail.component.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.scss
└── index.html
```

## Tecnologias

- **Angular:** 21
- **Tailwind CSS:** v4.1.18
- **Spartan UI:** @spartan-ng/brain v0.0.1-alpha.614
- **PostCSS:** v8.5.6
- **TypeScript:** v5.9.2

## Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Build para produção
npm run build

# Adicionar componentes do Spartan UI
npx ng g @spartan-ng/cli:ui

# Executar testes
npm test
```

## Próximos Passos

1. Adicionar mais componentes do Spartan UI conforme necessário
2. Criar documentação detalhada para cada componente
3. Adicionar exemplos de uso para cada componente
4. Configurar variáveis de ambiente para diferentes ambientes
5. Implementar testes para componentes críticos

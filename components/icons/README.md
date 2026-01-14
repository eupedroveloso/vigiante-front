# Biblioteca de Ícones Personalizados

Biblioteca de ícones personalizados do design system, extraídos do Figma e implementados como componentes React reutilizáveis.

## Instalação

Os ícones já estão incluídos no projeto. Não é necessária instalação adicional.

## Uso Básico

### Import Individual

```tsx
import { Map, List, Bell } from "@/components/icons"

function MyComponent() {
  return (
    <div>
      <Map size={16} />
      <List size={24} />
      <Bell size={32} />
    </div>
  )
}
```

### Import All

```tsx
import * as Icons from "@/components/icons"

function MyComponent() {
  return (
    <div>
      <Icons.Map size={16} />
      <Icons.List size={24} />
    </div>
  )
}
```

### Dynamic Icon

```tsx
import { Icon, type IconName } from "@/components/icons"

function MyComponent() {
  const iconName: IconName = "map"
  
  return <Icon name={iconName} size={16} />
}
```

## Props

Todos os ícones aceitam as seguintes props:

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `size` | `number \| string` | `18` | Tamanho do ícone em pixels (número) ou qualquer valor CSS válido (string). Mínimo: 18px, escala em múltiplos de 8 |
| `className` | `string` | `undefined` | Classes CSS adicionais para personalização (incluindo cores via `text-*`) |
| `style` | `React.CSSProperties` | `undefined` | Estilos inline (incluindo `color` para cores customizadas) |

## Cores Variáveis

Os ícones usam `fill="currentColor"` nos SVGs, permitindo que herdem a cor do texto via CSS:

- **Classes Tailwind**: Use `text-primary`, `text-muted-foreground`, `text-destructive`, etc.
- **Temas**: Os ícones se adaptam automaticamente ao tema claro/escuro quando usam classes do design system
- **Estados**: Combine com `hover:`, `focus:`, `active:` para estados interativos
- **Customização**: Use `style={{ color: '...' }}` para cores específicas

## Exemplos

### Com Tamanho Customizado

```tsx
<Map size={24} />
<Map size="2rem" />
<Map size="100%" />
```

### Com Classes CSS e Cores Variáveis

Os ícones suportam cores variáveis através de classes CSS do Tailwind. Eles herdam a cor do texto (`currentColor`), permitindo fácil customização:

```tsx
// Cores do design system
<Map size={24} className="text-primary" />
<Map size={24} className="text-muted-foreground" />
<Map size={24} className="text-destructive" />

// Estados interativos
<Map size={24} className="text-primary hover:text-primary/80" />
<Map size={24} className="text-foreground hover:text-primary transition-colors" />

// Dark mode automático
<Map size={24} className="text-foreground" /> // Adapta automaticamente ao tema

// Cores customizadas
<Map size={24} className="text-blue-500" />
<Map size={24} style={{ color: '#FF6B35' }} />
```

### Em Botões

```tsx
import { Button } from "@/components/ui/button"
import { Map } from "@/components/icons"

<Button>
  <Map size={16} className="mr-2" />
  Ver Mapa
</Button>
```

## Ícones Disponíveis

A biblioteca contém 65+ ícones organizados nas seguintes categorias:

- **Navegação**: chevron-right, chevron-left, chevron-up, chevron-down, expand
- **Ações**: plus, minus, trash, copy, check, xmark
- **Localização**: map, location-dot, location-plus, location-crosshairs, magnifying-glass-location
- **Ferramentas de Desenho**: draw-circle, draw-square, draw-polygon, pen-line, ruler
- **Camadas**: layer-group, layer-plus, layer-minus, border-inner
- **Interface**: list, bars, ellipsis, ellipsis-vertical, grip-dots
- **Arquivos**: file, file-circle-info, floppy-disk
- **Usuários**: user, users-rectangle, clipboard-user
- **Calendário**: calendar, calendar-lines
- **E muito mais...**

Veja todos os ícones disponíveis na [página de showcase](/styleguide/components/icons).

## TypeScript

A biblioteca é totalmente tipada. Use `IconName` para garantir que apenas nomes de ícones válidos sejam usados:

```tsx
import type { IconName } from "@/components/icons"

const iconName: IconName = "map" // ✅ Válido
const invalid: IconName = "invalid-icon" // ❌ Erro de tipo
```

## Performance

- Os ícones usam lazy loading para melhorar a performance
- Os SVGs são carregados sob demanda
- Tamanho otimizado para web

## Adicionando Novos Ícones

Para adicionar novos ícones:

1. Adicione a URL do SVG em `iconUrls`
2. Crie o componente usando `createIcon`
3. Exporte o componente
4. Adicione ao `iconRegistry`
5. Adicione o nome ao tipo `IconName`

Exemplo:

```tsx
// 1. Adicione a URL
const iconUrls = {
  // ... existing icons
  "new-icon": "http://localhost:3845/assets/...",
}

// 2. Crie o componente
export const NewIcon = createIcon("NewIcon", iconUrls["new-icon"])

// 3. Adicione ao registry
export const iconRegistry = {
  // ... existing icons
  "new-icon": NewIcon,
} as const
```

## Notas

- Os ícones são renderizados como `<img>` tags para compatibilidade
- Todos os ícones têm viewBox de 16x16
- Os ícones herdam a cor do texto através de CSS (use `currentColor` se necessário)
- Para melhor performance, prefira importar apenas os ícones que você precisa

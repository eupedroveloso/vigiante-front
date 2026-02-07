import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

interface ColorSwatch {
  name: string;
  class: string;
  variable: string;
}

interface ColorScale {
  name: string;
  baseColor: string;
  shades: { shade: number; color: string }[];
}

interface ThemeColor {
  name: string;
  variable: string;
  description: string;
  lightValue: string;
  darkValue: string;
}

interface TypographyExample {
  label: string;
  class: string;
}

interface FontWeight {
  weight: number;
  name: string;
  description: string;
  cssClass: string;
}

interface TypographyHierarchy {
  level: string;
  fontSize: string;
  fontSizePx: string;
  lineHeight: string;
  fontWeight: number;
  fontWeightName: string;
  letterSpacing?: string;
  useCase: string;
  cssClass: string;
}

interface RadiusExample {
  label: string;
  value: string;
}

interface CardExample {
  title: string;
  description: string;
}

@Component({
  selector: 'app-tokens',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tokens.component.html',
  styleUrl: './tokens.component.scss'
})
export class TokensComponent {
  currentTheme = signal<'light' | 'dark'>('light');
  activeColorTab = signal<'all-colors' | 'theme-colors'>('all-colors');
  activeTypographyTab = signal<'hierarchy' | 'weights' | 'family'>('hierarchy');
  
  colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  
  semanticColors: ColorSwatch[] = [
    { name: 'Primary', class: 'bg-primary', variable: '--primary' },
    { name: 'Secondary', class: 'bg-secondary', variable: '--secondary' },
    { name: 'Success', class: 'bg-success', variable: '--success' },
    { name: 'Warning', class: 'bg-warning', variable: '--warning' },
    { name: 'Destructive', class: 'bg-destructive', variable: '--destructive' },
    { name: 'Info', class: 'bg-info', variable: '--info' },
    { name: 'Muted', class: 'bg-muted', variable: '--muted' },
    { name: 'Accent', class: 'bg-accent', variable: '--accent' }
  ];

  colorScales: ColorScale[] = [
    {
      name: 'Primary',
      baseColor: '#FF5B04',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getPrimaryColor(shade)
      }))
    },
    {
      name: 'Success',
      baseColor: '#7ccf00',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getSuccessColor(shade)
      }))
    },
    {
      name: 'Warning',
      baseColor: '#efb100',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getWarningColor(shade)
      }))
    },
    {
      name: 'Destructive',
      baseColor: '#fb2c36',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getDestructiveColor(shade)
      }))
    },
    {
      name: 'Info',
      baseColor: '#2b7fff',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getInfoColor(shade)
      }))
    },
    {
      name: 'Secondary',
      baseColor: '#F5F5F5',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getNeutralColor(shade)
      }))
    },
    {
      name: 'Muted',
      baseColor: '#F5F5F5',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getNeutralColor(shade)
      }))
    },
    {
      name: 'Accent',
      baseColor: '#F5F5F5',
      shades: this.colorShades.map(shade => ({
        shade,
        color: this.getNeutralColor(shade)
      }))
    }
  ];

  themeColors: ThemeColor[] = [
    {
      name: 'Background',
      variable: '--background',
      description: 'Cor de fundo principal da aplicação',
      lightValue: 'oklch(100% 0 0)',
      darkValue: 'oklch(20% 0 0)'
    },
    {
      name: 'Foreground',
      variable: '--foreground',
      description: 'Cor do texto principal',
      lightValue: 'oklch(0.145 0 0)',
      darkValue: 'oklch(95% 0 0)'
    },
    {
      name: 'Card',
      variable: '--card',
      description: 'Cor de fundo de cards e superfícies elevadas',
      lightValue: 'oklch(100% 0 0)',
      darkValue: 'oklch(25% 0 0)'
    },
    {
      name: 'Card Foreground',
      variable: '--card-foreground',
      description: 'Cor do texto em cards',
      lightValue: 'oklch(0.145 0 0)',
      darkValue: 'oklch(95% 0 0)'
    },
    {
      name: 'Popover',
      variable: '--popover',
      description: 'Cor de fundo de popovers, dropdowns e tooltips',
      lightValue: 'oklch(100% 0 0)',
      darkValue: 'oklch(25% 0 0)'
    },
    {
      name: 'Popover Foreground',
      variable: '--popover-foreground',
      description: 'Cor do texto em popovers',
      lightValue: 'oklch(0.145 0 0)',
      darkValue: 'oklch(95% 0 0)'
    },
    {
      name: 'Primary',
      variable: '--primary',
      description: 'Cor primária da marca (tom 400)',
      lightValue: 'oklch(68% 0.23 38.5)',
      darkValue: 'oklch(68% 0.23 38.5)'
    },
    {
      name: 'Primary Foreground',
      variable: '--primary-foreground',
      description: 'Cor do texto sobre o primário',
      lightValue: 'oklch(0.985 0 0)',
      darkValue: 'oklch(0.985 0 0)'
    },
    {
      name: 'Secondary',
      variable: '--secondary',
      description: 'Cor secundária para elementos menos proeminentes',
      lightValue: 'oklch(0.97 0 0)',
      darkValue: 'oklch(30% 0 0)'
    },
    {
      name: 'Secondary Foreground',
      variable: '--secondary-foreground',
      description: 'Cor do texto sobre o secundário',
      lightValue: 'oklch(0.205 0 0)',
      darkValue: 'oklch(95% 0 0)'
    },
    {
      name: 'Muted',
      variable: '--muted',
      description: 'Cor para elementos desativados ou menos importantes',
      lightValue: 'oklch(0.97 0 0)',
      darkValue: 'oklch(30% 0 0)'
    },
    {
      name: 'Muted Foreground',
      variable: '--muted-foreground',
      description: 'Cor do texto em elementos muted',
      lightValue: 'oklch(0.556 0 0)',
      darkValue: 'oklch(75% 0 0)'
    },
    {
      name: 'Accent',
      variable: '--accent',
      description: 'Cor de destaque para elementos interativos',
      lightValue: 'oklch(0.97 0 0)',
      darkValue: 'oklch(30% 0 0)'
    },
    {
      name: 'Accent Foreground',
      variable: '--accent-foreground',
      description: 'Cor do texto sobre o accent',
      lightValue: 'oklch(0.205 0 0)',
      darkValue: 'oklch(95% 0 0)'
    },
    {
      name: 'Destructive',
      variable: '--destructive',
      description: 'Cor para ações destrutivas e erros',
      lightValue: 'oklch(59% 0.25 12)',
      darkValue: 'oklch(59% 0.25 12)'
    },
    {
      name: 'Destructive Foreground',
      variable: '--destructive-foreground',
      description: 'Cor do texto sobre o destructive',
      lightValue: 'oklch(0.985 0 0)',
      darkValue: 'oklch(0.985 0 0)'
    },
    {
      name: 'Border',
      variable: '--border',
      description: 'Cor das bordas e divisores',
      lightValue: 'oklch(90% 0 0)',
      darkValue: 'oklch(35% 0 0)'
    },
    {
      name: 'Input',
      variable: '--input',
      description: 'Cor da borda de inputs',
      lightValue: 'oklch(90% 0 0)',
      darkValue: 'oklch(35% 0 0)'
    },
    {
      name: 'Ring',
      variable: '--ring',
      description: 'Cor do anel de foco',
      lightValue: 'oklch(68% 0.23 38.5)',
      darkValue: 'oklch(68% 0.23 38.5)'
    },
    {
      name: 'Sidebar',
      variable: '--sidebar',
      description: 'Cor de fundo da sidebar',
      lightValue: 'oklch(100% 0 0)',
      darkValue: 'oklch(25% 0 0)'
    },
    {
      name: 'Sidebar Foreground',
      variable: '--sidebar-foreground',
      description: 'Cor do texto na sidebar',
      lightValue: 'oklch(0.145 0 0)',
      darkValue: 'oklch(95% 0 0)'
    },
    {
      name: 'Sidebar Border',
      variable: '--sidebar-border',
      description: 'Cor da borda da sidebar',
      lightValue: 'oklch(90% 0 0)',
      darkValue: 'oklch(35% 0 0)'
    },
    {
      name: 'Success',
      variable: '--success',
      description: 'Cor para ações bem-sucedidas',
      lightValue: 'oklch(72% 0.22 142)',
      darkValue: 'oklch(72% 0.22 142)'
    },
    {
      name: 'Warning',
      variable: '--warning',
      description: 'Cor para avisos e alertas',
      lightValue: 'oklch(72% 0.19 70)',
      darkValue: 'oklch(72% 0.19 70)'
    },
    {
      name: 'Info',
      variable: '--info',
      description: 'Cor para informações',
      lightValue: 'oklch(64% 0.20 242)',
      darkValue: 'oklch(64% 0.20 242)'
    }
  ];

  typographyExamples: TypographyExample[] = [
    { label: 'Heading 1', class: 'text-4xl font-bold' },
    { label: 'Heading 2', class: 'text-3xl font-bold' },
    { label: 'Heading 3', class: 'text-2xl font-bold' },
    { label: 'Heading 4', class: 'text-xl font-semibold' },
    { label: 'Body Large', class: 'text-lg' },
    { label: 'Body Regular', class: 'text-base' },
    { label: 'Body Small', class: 'text-sm' },
    { label: 'Caption', class: 'text-xs' }
  ];

  fontWeights: FontWeight[] = [
    { weight: 100, name: 'Thin', description: 'Peso mais leve, raramente usado', cssClass: 'font-thin' },
    { weight: 200, name: 'Extra Light', description: 'Muito leve, para textos decorativos', cssClass: 'font-extralight' },
    { weight: 300, name: 'Light', description: 'Leve, para textos secundários', cssClass: 'font-light' },
    { weight: 400, name: 'Regular', description: 'Peso padrão para corpo de texto', cssClass: 'font-normal' },
    { weight: 500, name: 'Medium', description: 'Peso médio, para ênfase sutil', cssClass: 'font-medium' },
    { weight: 600, name: 'Semibold', description: 'Semi-negrito, para subtítulos', cssClass: 'font-semibold' },
    { weight: 700, name: 'Bold', description: 'Negrito, para títulos e ênfase', cssClass: 'font-bold' },
    { weight: 800, name: 'Extra Bold', description: 'Muito negrito, para títulos grandes', cssClass: 'font-extrabold' },
    { weight: 900, name: 'Black', description: 'Peso máximo, para máxima ênfase', cssClass: 'font-black' }
  ];

  typographyHierarchy: TypographyHierarchy[] = [
    {
      level: 'H1',
      fontSize: '2.25rem',
      fontSizePx: '36px',
      lineHeight: '2.5rem',
      fontWeight: 700,
      fontWeightName: 'Bold',
      useCase: 'Títulos principais de página',
      cssClass: 'text-4xl font-bold'
    },
    {
      level: 'H2',
      fontSize: '1.875rem',
      fontSizePx: '30px',
      lineHeight: '2.25rem',
      fontWeight: 700,
      fontWeightName: 'Bold',
      useCase: 'Títulos de seção',
      cssClass: 'text-3xl font-bold'
    },
    {
      level: 'H3',
      fontSize: '1.5rem',
      fontSizePx: '24px',
      lineHeight: '2rem',
      fontWeight: 700,
      fontWeightName: 'Bold',
      useCase: 'Subtítulos',
      cssClass: 'text-2xl font-bold'
    },
    {
      level: 'H4',
      fontSize: '1.25rem',
      fontSizePx: '20px',
      lineHeight: '1.75rem',
      fontWeight: 600,
      fontWeightName: 'Semibold',
      useCase: 'Títulos de card ou componente',
      cssClass: 'text-xl font-semibold'
    },
    {
      level: 'H5',
      fontSize: '1.125rem',
      fontSizePx: '18px',
      lineHeight: '1.75rem',
      fontWeight: 600,
      fontWeightName: 'Semibold',
      useCase: 'Títulos pequenos',
      cssClass: 'text-lg font-semibold'
    },
    {
      level: 'H6',
      fontSize: '1rem',
      fontSizePx: '16px',
      lineHeight: '1.5rem',
      fontWeight: 600,
      fontWeightName: 'Semibold',
      useCase: 'Títulos mínimos',
      cssClass: 'text-base font-semibold'
    },
    {
      level: 'Body Large',
      fontSize: '1.125rem',
      fontSizePx: '18px',
      lineHeight: '1.75rem',
      fontWeight: 400,
      fontWeightName: 'Regular',
      useCase: 'Texto de corpo grande',
      cssClass: 'text-lg'
    },
    {
      level: 'Body',
      fontSize: '1rem',
      fontSizePx: '16px',
      lineHeight: '1.5rem',
      fontWeight: 400,
      fontWeightName: 'Regular',
      useCase: 'Texto de corpo padrão',
      cssClass: 'text-base'
    },
    {
      level: 'Body Small',
      fontSize: '0.875rem',
      fontSizePx: '14px',
      lineHeight: '1.25rem',
      fontWeight: 400,
      fontWeightName: 'Regular',
      useCase: 'Texto secundário',
      cssClass: 'text-sm'
    },
    {
      level: 'Caption',
      fontSize: '0.75rem',
      fontSizePx: '12px',
      lineHeight: '1rem',
      fontWeight: 400,
      fontWeightName: 'Regular',
      useCase: 'Legendas e textos auxiliares',
      cssClass: 'text-xs'
    }
  ];

  fontFamilyInfo = {
    name: 'Geist Sans',
    provider: 'Google Fonts',
    designer: 'Vercel',
    description: 'Geist Sans é uma fonte sans-serif moderna e versátil, projetada para interfaces digitais. Oferece excelente legibilidade em todos os tamanhos e pesos.',
    features: [
      'Otimizada para telas',
      'Suporte completo a caracteres latinos',
      '9 pesos disponíveis (100-900)',
      'Ligaduras e kerning otimizados',
      'Rendering otimizado para web'
    ],
    cssVariable: '--font-sans',
    cssValue: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fallbacks: [
      '-apple-system',
      'BlinkMacSystemFont',
      "'Segoe UI'",
      'Roboto',
      "'Helvetica Neue'",
      'Arial',
      'sans-serif'
    ],
    link: 'https://fonts.google.com/specimen/Geist+Sans',
    license: 'SIL Open Font License 1.1'
  };

  radiusExamples: RadiusExample[] = [
    { label: 'None', value: '0' },
    { label: 'Small', value: '0.25rem' },
    { label: 'Medium', value: '0.5rem' },
    { label: 'Large', value: '1rem' },
    { label: 'XLarge', value: '1.5rem' },
    { label: 'Full', value: '9999px' }
  ];

  cardExamples: CardExample[] = [
    { 
      title: 'Card Title 1', 
      description: 'Esta é uma descrição de card com algum conteúdo de texto.' 
    },
    { 
      title: 'Card Title 2', 
      description: 'Outro card com conteúdo diferente para mostrar variedade.' 
    },
    { 
      title: 'Card Title 3', 
      description: 'Terceiro card demonstrando o estilo do componente.' 
    }
  ];

  toggleTheme(): void {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      this.currentTheme.set('light');
    } else {
      html.classList.add('dark');
      this.currentTheme.set('dark');
    }
  }

  setColorTab(tab: 'all-colors' | 'theme-colors'): void {
    this.activeColorTab.set(tab);
  }

  setTypographyTab(tab: 'hierarchy' | 'weights' | 'family'): void {
    this.activeTypographyTab.set(tab);
  }

  getPrimaryColor(shade: number): string {
    const lightnessMap: Record<number, number> = {
      50: 95, 100: 90, 200: 85, 300: 75, 400: 68,
      500: 59, 600: 50, 700: 45, 800: 38, 900: 30
    };
    const lightness = lightnessMap[shade] || 59;
    const chroma = shade <= 300 ? 0.16 : shade >= 700 ? 0.26 : 0.23;
    return `oklch(${lightness}% ${chroma} 38.5)`;
  }

  getSuccessColor(shade: number): string {
    // Verde #7ccf00 oklch(72% 0.22 142)
    const lightnessMap: Record<number, number> = {
      50: 95, 100: 90, 200: 85, 300: 78, 400: 72,
      500: 65, 600: 58, 700: 50, 800: 42, 900: 35
    };
    const lightness = lightnessMap[shade] || 72;
    const chroma = shade <= 300 ? 0.15 : shade >= 700 ? 0.25 : 0.22;
    return `oklch(${lightness}% ${chroma} 142)`;
  }

  getWarningColor(shade: number): string {
    // Amarelo #efb100 oklch(72% 0.19 70)
    const lightnessMap: Record<number, number> = {
      50: 95, 100: 90, 200: 85, 300: 78, 400: 72,
      500: 65, 600: 58, 700: 50, 800: 42, 900: 35
    };
    const lightness = lightnessMap[shade] || 72;
    const chroma = shade <= 300 ? 0.12 : shade >= 700 ? 0.22 : 0.19;
    return `oklch(${lightness}% ${chroma} 70)`;
  }

  getDestructiveColor(shade: number): string {
    // Vermelho #fb2c36 oklch(59% 0.25 12)
    const lightnessMap: Record<number, number> = {
      50: 95, 100: 90, 200: 80, 300: 68, 400: 59,
      500: 50, 600: 42, 700: 35, 800: 28, 900: 22
    };
    const lightness = lightnessMap[shade] || 59;
    const chroma = shade <= 300 ? 0.18 : shade >= 700 ? 0.28 : 0.25;
    return `oklch(${lightness}% ${chroma} 12)`;
  }

  getInfoColor(shade: number): string {
    // Azul #2b7fff oklch(64% 0.20 242)
    const lightnessMap: Record<number, number> = {
      50: 95, 100: 90, 200: 82, 300: 72, 400: 64,
      500: 56, 600: 48, 700: 40, 800: 32, 900: 25
    };
    const lightness = lightnessMap[shade] || 64;
    const chroma = shade <= 300 ? 0.15 : shade >= 700 ? 0.25 : 0.20;
    return `oklch(${lightness}% ${chroma} 242)`;
  }

  getNeutralColor(shade: number): string {
    // Cinza neutro
    const lightnessMap: Record<number, number> = {
      50: 98, 100: 97, 200: 95, 300: 90, 400: 85,
      500: 70, 600: 55, 700: 40, 800: 25, 900: 15
    };
    const lightness = lightnessMap[shade] || 70;
    return `oklch(${lightness}% 0 0)`;
  }

  getSemanticColor(variable: string): string {
    return `var(${variable})`;
  }

  getThemeColorValue(variable: string, theme: 'light' | 'dark'): string {
    const color = this.themeColors.find(c => c.variable === variable);
    if (!color) return '';
    return theme === 'light' ? color.lightValue : color.darkValue;
  }
}

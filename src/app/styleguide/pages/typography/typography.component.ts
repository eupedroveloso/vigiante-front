import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

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

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [NgClass],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss'
})
export class TypographyComponent {
  activeTab = signal<'hierarchy' | 'weights' | 'family'>('hierarchy');

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
    { level: 'H1', fontSize: '2.25rem', fontSizePx: '36px', lineHeight: '2.5rem', fontWeight: 700, fontWeightName: 'Bold', useCase: 'Títulos principais de página', cssClass: 'text-4xl font-bold' },
    { level: 'H2', fontSize: '1.875rem', fontSizePx: '30px', lineHeight: '2.25rem', fontWeight: 700, fontWeightName: 'Bold', useCase: 'Títulos de seção', cssClass: 'text-3xl font-bold' },
    { level: 'H3', fontSize: '1.5rem', fontSizePx: '24px', lineHeight: '2rem', fontWeight: 700, fontWeightName: 'Bold', useCase: 'Subtítulos', cssClass: 'text-2xl font-bold' },
    { level: 'H4', fontSize: '1.25rem', fontSizePx: '20px', lineHeight: '1.75rem', fontWeight: 600, fontWeightName: 'Semibold', useCase: 'Títulos de card ou componente', cssClass: 'text-xl font-semibold' },
    { level: 'H5', fontSize: '1.125rem', fontSizePx: '18px', lineHeight: '1.75rem', fontWeight: 600, fontWeightName: 'Semibold', useCase: 'Títulos pequenos', cssClass: 'text-lg font-semibold' },
    { level: 'H6', fontSize: '1rem', fontSizePx: '16px', lineHeight: '1.5rem', fontWeight: 600, fontWeightName: 'Semibold', useCase: 'Títulos mínimos', cssClass: 'text-base font-semibold' },
    { level: 'Body Large', fontSize: '1.125rem', fontSizePx: '18px', lineHeight: '1.75rem', fontWeight: 400, fontWeightName: 'Regular', useCase: 'Texto de corpo grande', cssClass: 'text-lg' },
    { level: 'Body', fontSize: '1rem', fontSizePx: '16px', lineHeight: '1.5rem', fontWeight: 400, fontWeightName: 'Regular', useCase: 'Texto de corpo padrão', cssClass: 'text-base' },
    { level: 'Body Small', fontSize: '0.875rem', fontSizePx: '14px', lineHeight: '1.25rem', fontWeight: 400, fontWeightName: 'Regular', useCase: 'Texto secundário', cssClass: 'text-sm' },
    { level: 'Caption', fontSize: '0.75rem', fontSizePx: '12px', lineHeight: '1rem', fontWeight: 400, fontWeightName: 'Regular', useCase: 'Legendas e textos auxiliares', cssClass: 'text-xs' }
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
    fallbacks: ['-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', "'Helvetica Neue'", 'Arial', 'sans-serif'],
    link: 'https://fonts.google.com/specimen/Geist+Sans',
    license: 'SIL Open Font License 1.1'
  };

  setTab(tab: 'hierarchy' | 'weights' | 'family'): void {
    this.activeTab.set(tab);
  }

  getHierarchyLabel(hierarchy: TypographyHierarchy): string {
    const labels: Record<string, string> = {
      'H1': 'Título Principal',
      'H2': 'Título de Seção',
      'H3': 'Subtítulo',
      'H4': 'Título de Card',
      'H5': 'Título Pequeno',
      'H6': 'Título Mínimo'
    };
    return labels[hierarchy.level] ?? hierarchy.level;
  }
}

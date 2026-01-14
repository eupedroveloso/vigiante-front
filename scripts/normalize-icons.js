const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Função para normalizar um SVG usando regex
function normalizeSVG(svgContent, filename) {
  try {
    // Extrair viewBox original
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
    if (!viewBoxMatch) {
      console.warn(`⚠ ${filename}: No viewBox found, skipping`);
      return null;
    }

    const [x, y, width, height] = viewBoxMatch[1].split(/\s+/).map(parseFloat);
    
    // Se já está normalizado, pular
    if (x === 0 && y === 0 && width === 16 && height === 16) {
      if (svgContent.includes('preserveAspectRatio="xMidYMid meet"')) {
        console.log(`✓ ${filename}: Already normalized`);
        return null;
      }
    }

    // Calcular escala e translação para centralizar no viewBox 16x16
    const scaleX = 16 / width;
    const scaleY = 16 / height;
    const scale = Math.min(scaleX, scaleY); // Manter proporção
    
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const translateX = (16 - scaledWidth) / 2 - x * scale;
    const translateY = (16 - scaledHeight) / 2 - y * scale;

    // Encontrar o conteúdo interno do SVG (tudo entre <svg> e </svg>)
    const svgOpenMatch = svgContent.match(/<svg[^>]*>/);
    const svgCloseIndex = svgContent.lastIndexOf('</svg>');
    
    if (!svgOpenMatch || svgCloseIndex === -1) {
      throw new Error('Invalid SVG structure');
    }

    const svgOpenTag = svgOpenMatch[0];
    const innerContent = svgContent.substring(svgOpenMatch.index + svgOpenMatch[0].length, svgCloseIndex).trim();

    // Criar novo SVG com viewBox normalizado
    let newSvgOpen = svgOpenTag
      .replace(/viewBox=["'][^"']+["']/, 'viewBox="0 0 16 16"')
      .replace(/preserveAspectRatio=["'][^"']+["']/, '')
      .replace(/width=["'][^"']+["']/, 'width="16"')
      .replace(/height=["'][^"']+["']/, 'height="16"')
      .replace(/\s*style=["'][^"']+["']/, '')
      .replace(/\s*overflow=["'][^"']+["']/, '');

    // Adicionar preserveAspectRatio se não existir
    if (!newSvgOpen.includes('preserveAspectRatio')) {
      newSvgOpen = newSvgOpen.replace(/>$/, ' preserveAspectRatio="xMidYMid meet">');
    }

    // Envolver conteúdo interno em grupo com transformação
    const transform = `translate(${translateX.toFixed(4)}, ${translateY.toFixed(4)}) scale(${scale.toFixed(4)})`;
    const wrappedContent = `<g transform="${transform}">${innerContent}</g>`;

    return `${newSvgOpen}\n${wrappedContent}\n</svg>`;
  } catch (error) {
    console.error(`✗ ${filename}: ${error.message}`);
    return null;
  }
}

// Processar todos os SVGs
function normalizeAllIcons() {
  const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
  const results = {
    normalized: [],
    skipped: [],
    failed: []
  };

  console.log(`Normalizando ${files.length} ícones SVG...\n`);

  files.forEach(file => {
    const filePath = path.join(iconsDir, file);
    const svgContent = fs.readFileSync(filePath, 'utf8');
    
    const normalized = normalizeSVG(svgContent, file);
    
    if (normalized === null) {
      // Já estava normalizado ou erro
      if (svgContent.includes('viewBox="0 0 16 16"') && svgContent.includes('preserveAspectRatio="xMidYMid meet"')) {
        results.skipped.push(file);
      } else {
        results.failed.push(file);
      }
    } else {
      fs.writeFileSync(filePath, normalized, 'utf8');
      results.normalized.push(file);
      console.log(`✓ ${file}`);
    }
  });

  console.log(`\n=== Resumo ===`);
  console.log(`Normalizados: ${results.normalized.length}`);
  console.log(`Já normalizados: ${results.skipped.length}`);
  console.log(`Falhas: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log(`\nÍcones com falha:`);
    results.failed.forEach(file => {
      console.log(`  - ${file}`);
    });
  }

  return results;
}

// Executar
normalizeAllIcons();

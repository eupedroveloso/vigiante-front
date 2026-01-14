# Imagens de Preview dos Modos de Mapa

Este diretório contém as imagens de preview para cada modo de visualização do mapa no componente `MapModeView`.

## Imagens necessárias:

1. **map-satelite.png** - Preview do modo Satélite
   - Mapa de satélite escuro mostrando terreno montanhoso com estradas amarelas
   - Dimensões recomendadas: 22x22px ou múltiplo (44x44px, 88x88px para melhor qualidade)

2. **map-gps.png** - Preview do modo GPS
   - Mapa minimalista com um grande parque verde e rede de ruas
   - Dimensões recomendadas: 22x22px ou múltiplo

3. **map-relevo.png** - Preview do modo Relevo
   - Vista aérea/satélite de paisagem urbana e suburbana com desenvolvimento denso
   - Dimensões recomendadas: 22x22px ou múltiplo

## Como adicionar as imagens:

1. Salve as imagens com os nomes exatos acima
2. Coloque-as neste diretório (`public/images/`)
3. As imagens serão automaticamente carregadas pelo componente

## Nota:

Se as imagens não estiverem disponíveis, o componente usará os ícones padrão como fallback.

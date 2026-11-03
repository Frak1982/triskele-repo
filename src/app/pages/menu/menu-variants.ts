export interface MenuVariant {
  name: string;
  price: number;
  descriptionKey: string;
}

// Variants from the current printed menu; other categories retain their existing cards.
export const MENU_VARIANTS: Record<string, MenuVariant[]> = {
  ARANCINI: [
    { name: 'Etna', price: 5, descriptionKey: 'ETNA' },
    { name: 'Bronte', price: 6, descriptionKey: 'BRONTE' },
    { name: 'Noto', price: 5.5, descriptionKey: 'NOTO' },
    { name: 'Norma', price: 5, descriptionKey: 'NORMA' },
    { name: "N’duja", price: 5.5, descriptionKey: 'NDUJA' },
  ],
  FOCACCIA: [
    { name: 'Elba', price: 9, descriptionKey: 'ELBA' },
    { name: 'Firenze', price: 9.5, descriptionKey: 'FIRENZE' },
    { name: 'Toscana', price: 9.5, descriptionKey: 'TOSCANA' },
    { name: 'Lucca', price: 9, descriptionKey: 'LUCCA' },
  ],
  PIZZA_FRITTA: [
    { name: 'Napoli', price: 8, descriptionKey: 'NAPOLI' },
    { name: 'Siciliana', price: 8, descriptionKey: 'SICILIANA' },
    { name: 'Caserta', price: 8, descriptionKey: 'CASERTA' },
  ],
  PIZZA_TEGLIA: [
    { name: 'Ragusa', price: 7.5, descriptionKey: 'RAGUSA' },
    { name: 'Roma', price: 8, descriptionKey: 'ROMA' },
    { name: 'Catania', price: 6.8, descriptionKey: 'CATANIA' },
    { name: 'Tropea', price: 7.5, descriptionKey: 'TROPEA' },
    { name: 'Licuti', price: 9, descriptionKey: 'LICUTI' },
  ],
};

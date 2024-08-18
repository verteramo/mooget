export enum Color {
  Dark = '#282c34',
  Light = '#eee',
  Turtle = '#388e3c',
  Raphael = '#d32f2f',
  Leonardo = '#0288d1',
  Donatello = '#ab47bc',
  Michelangelo = '#f57c00',
}

export const PaletteColor = Object.values(Color).filter((color) => ![Color.Dark, Color.Light].includes(color))

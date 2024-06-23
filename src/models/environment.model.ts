type Theme = 'light' | 'dark'

export interface Environment {
  theme: Theme
}

export const EnvironmentDefault: Environment = {
  theme: 'light'
}

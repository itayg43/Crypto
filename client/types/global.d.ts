interface Number {
  toUSDString: (value: number) => string;
  toAbsFixedString: (value: number) => string;
  toBMKString: (value: number) => string;
}

declare module '@rainbow-me/animated-charts';

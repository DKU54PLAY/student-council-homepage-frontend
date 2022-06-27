import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      blur: string;
      white: string;
      gray020: string;
      gray040: string;
      gray050: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
      red: string;
      blue: string;
    };
    fonts: {
      title: string;
      smallTitle: string;
      smallSubTitle: string;
      smallDescription: string;
      detailBold: string;
      detailThin: string;
    };
    media: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
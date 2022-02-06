import { createGlobalStyle } from "styled-components";
import css from "@styled-system/css";

const GlobalStyles = createGlobalStyle`
  body {
    ${css({
      margin: 0,
      fontFamily: "secondary",
      fontSize: "sm",
      lineHeight: "sm",
      backgroundColor: "neutral_200",
      color: "text",
    })}
  }

  p {
    ${css({
      fontSize: "md",
      lineHeight: "md",
    })}
  }

  a {
    ${css({
      color: "primary_700",
    })}
  }

  a:hover{
    text-decoration: none;
  }
  .hidden {
    display: none;
  }

  h1, h2, h3, h4, p, a {
    ${css({
      fontFamily: "primary",
      fontWeight: "regular",
      letterSpacing: "-0.3px",
      color: "text",
    })}
  }

  h1 {
    ${css({
      fontSize: "xl",
      lineHeight: "xl",
    })}
  }

  h2 {
    ${css({
      fontSize: "lg",
      lineHeight: "lg",
    })}
  }

  h3 {
    ${css({
      fontSize: "md",
      lineHeight: "md",
    })}
  }

  h4 {
    ${css({
      fontSize: "md",
      lineHeight: "md",
    })}
  }
`;

export default GlobalStyles;

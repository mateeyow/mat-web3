import React from "react";

type SVGElementProps = React.SVGProps<SVGSVGElement>;

export const PauseIcon = (props: SVGElementProps) => (
  <svg
    data-name="Layer 1"
    viewBox="0 0 100 125"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M25.101 5.013h50v10h-50zM25.101 85.013h50v10h-50zM15.101 15.148h10v10h-10zM15.101 75.013h10v10h-10zM75.101 75.013h10v10h-10zM75.101 15.148h10v10h-10zM85.101 25.013h10v50.028h-10z" />
    <path d="M15.101 25.013h-10c.01 16.676-.01 33.324 0 50h10c-.01-16.676.01-33.324 0-50ZM35.25 35.047h10v30h-10zM55.25 35.047h10v30h-10z" />
  </svg>
);

export const PlayIcon = (props: SVGElementProps) => (
  <svg
    data-name="Layer 2"
    viewBox="0 0 100 125"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M45.164 15.05h-20v70h20l-.01-10h-9.99v-50h10v-10zM45.164 65.051h10v10h-10zM55.164 55.051h10v10h-10zM65.164 45.051h10v10h-10zM55.164 35.051h10v10h-10zM45.164 25.051h10v10h-10z" />
  </svg>
);

export const MuteIcon = (props: SVGElementProps) => (
  <svg
    data-name="Layer 2"
    viewBox="0 0 100 125"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M15.481 14.903h10v10h-10zM5.481 4.903h10v10h-10zM45.424 24.903H25.481v10h10v10h10v-20h-.057zM75.481 74.903h10v10h-10zM85.481 84.903h10v10h-10z" />
    <path d="M65.424 4.903h-10v10h-10v10h10v50h-10v10h10v10h10v-30h10v-30h-10v-30zM25.425 54.903v-20h-10v30h20v-10h-10zM35.424 64.903h10v10h-10z" />
  </svg>
);

export const UnmuteIcon = (props: SVGElementProps) => (
  <svg
    data-name="Layer 2"
    viewBox="0 0 100 125"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M75.365 24.903v-10h10v10zM85.365 14.903v-10h10v10zM75.365 54.903v-10h20v10zM75.365 84.903v-10h10v10zM85.365 94.903v-10h10v10zM25.364 24.903h10v10h-10z" />
    <path d="M55.364 34.903v-30h-10v10h-10v10h10v50h-10v10h10v10h10v-30h10v-30h-10zM15.365 54.903v-10h10v-10h-20v30h20v-10h-10z" />
    <path d="M25.364 64.903h10v10h-10z" />
  </svg>
);

export const CoinIcon = (props: SVGElementProps) => (
  <svg
    style={{
      enableBackground: "new 0 0 24 24",
    }}
    viewBox="0 0 24 30"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 6h2V5h-4v1h1zM13 9V8h-2v1h1zM11 15v1h2v-1h-1zM13 10v5h1V9h-1zM12 18h-2v1h4v-1h-1zM14 17v1h2v-1h-1zM9 17H8v1h2v-1zM16 16v1h1v-2h-1zM8 15H7v2h1v-1zM15 7h1V6h-2v1zM10 7V6H8v1h1zM16 9h1V7h-1v1zM8 8V7H7v2h1zM17 9v6h1V9zM11 13V9h-1v6h1v-1zM7 13V9H6v6h1v-1z" />
  </svg>
);

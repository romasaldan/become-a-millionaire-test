import type { SVGProps } from "react";

export type HexagonProps = {
  stroke?: string;
  fill?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox">;

export function Hexagon(props: HexagonProps) {
  const { stroke = "#D0D0D8", fill = "white", ...svgProps } = props;

  return (
    <svg
      width="240"
      height="32"
      viewBox="0 0 240 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M21.4941 0.5H218.506C221.475 0.500071 224.328 1.64821 226.47 3.7041L239.277 16L226.47 28.2959C224.328 30.3518 221.475 31.4999 218.506 31.5H21.4941C18.5255 31.4999 15.6718 30.3518 13.5303 28.2959L0.72168 16L13.5303 3.7041C15.6718 1.6482 18.5255 0.500064 21.4941 0.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    </svg>
  );
}


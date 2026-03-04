import type { SVGProps } from "react";

export type HexagonProps = {
  stroke?: string;
  fill?: string;
} & Omit<SVGProps<SVGSVGElement>, "viewBox">;

export function Hexagon(props: HexagonProps) {
  const { stroke = "#EC6259", fill = "none", ...svgProps } = props;

  return (
    <svg
      width="288"
      height="56"
      viewBox="0 0 288 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M26.1758 0.5H261.824C265.538 0.5 269.024 2.29338 271.183 5.31543L287.385 28L271.183 50.6846C269.024 53.7066 265.538 55.5 261.824 55.5H26.1758C22.4619 55.5 18.9761 53.7066 16.8174 50.6846L0.614258 28L16.8174 5.31543C18.9761 2.29338 22.4619 0.5 26.1758 0.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    </svg>
  );
}


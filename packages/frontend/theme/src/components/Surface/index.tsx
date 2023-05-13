import { Fill } from "@/components/common.ts";
import { css } from "@emotion/react";
import { ReactNode } from "react";

export interface SurfaceProps {
  fill?: Fill;
  children: ReactNode;
};

export function Surface(props: SurfaceProps) {
  const style = css`
    ${props.fill?.apply() ?? ""}
  `;
  return <div css={style}>
    {props.children}
  </div>;
}

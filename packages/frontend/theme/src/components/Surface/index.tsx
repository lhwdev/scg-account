import { css } from "@emotion/react";
import { ReactNode } from "react";

export interface SurfaceProps {
  children: ReactNode;
};

export function Surface(props: SurfaceProps) {
  return <div css={css``}>
    {props.children}
  </div>;
}

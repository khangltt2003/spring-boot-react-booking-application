/// <reference types="vite/client" />
declare module "react" {
  interface HTMLAttributes {
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler;
    onPointerLeaveCapture?: React.PointerEventHandler;
  }
}

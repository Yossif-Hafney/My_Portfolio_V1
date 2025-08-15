import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
type ModalProps = { children: ReactNode };
const Modal = ({ children }: ModalProps) => {
  const eleRef = useRef<HTMLDivElement | null>(null);
  if (!eleRef.current) {
    const div = document.createElement("div");
    div.className = "modal";
    eleRef.current = div;
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    const el = eleRef.current!;
    if (!modalRoot) return;
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);
  return createPortal(<div>{children}</div>, eleRef.current!);
};
export default Modal;

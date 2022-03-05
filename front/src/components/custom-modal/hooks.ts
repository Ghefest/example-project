import { useState } from "react";

const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState<boolean>(initialMode);

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  const toggle = () => setModalOpen(prevOpen => !prevOpen);

  return [modalOpen, open, close, toggle] as const;
};

export { useModal };

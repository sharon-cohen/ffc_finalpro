import React, { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prevState) => !prevState);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};

export default useModal;

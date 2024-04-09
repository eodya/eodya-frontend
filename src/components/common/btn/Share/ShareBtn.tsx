import { useState } from "react";

import { ReactComponent as ShareSVG } from "../../../../assets/image/icon/share.svg";
import ShareModal from "./Modal/ShareModal";

export default function ShareBtn({
  className,
}: {
  className?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ShareSVG
        className={`cursor-pointer fill-black ${className ? className : ""}`}
        onClick={onOpen}
      />
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

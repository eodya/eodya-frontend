import Modal from "react-modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Facebook from "../../../../../assets/image/social/Facebook.png";
import Band from "../../../../../assets/image/social/Band.png";
import Twitter from "../../../../../assets/image/social/Twitter.png";
import BandShare from "../Social/BandShare";
import KakakoShare from "../Social/KakakoShare";
import { SnsBox } from "../SnsBox";

export default function ShareModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: any;
}) {
  const currentUrl = window.location.href;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={{
        content: {
          position: "absolute",
          overflow: "hidden",
          left: "50%",
          top: "50%",
          right: "auto",
          bottom: "auto",
          padding: 0,
          marginRight: "-50%",
          borderRadius: "10px",
          transform: "translate(-50%, -50%)",
          width: `${(280 / 360) * 100}%`,
          height: "auto",
          maxWidth: 280,
        },
        overlay: {
          zIndex: 9999,
          background: "rgba(000,000,000,0.5)",
        },
      }}
    >
      <div className="px-5 pb-5 pt-6 text-center tracking-custom">
        <div>
          <h2 className="text-lg font-semibold leading-[23.4px] text-gray-950">
            공유하기
          </h2>
          <p className="mt-2 text-base font-normal leading-[20.8px] text-gray-700">
            같이 가고 싶은 친구에게
            <br />
            공유해 보세요
          </p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <FacebookShareButton url={currentUrl}>
            <SnsBox>
              <img
                className="absolute left-0 top-0 h-full w-full object-cover object-center"
                src={Facebook}
                alt=""
              />
            </SnsBox>
          </FacebookShareButton>
          <BandShare>
            <SnsBox>
              <img
                className="absolute left-0 top-0 h-full w-full object-cover object-center"
                src={Band}
                alt=""
              />
            </SnsBox>
          </BandShare>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <TwitterShareButton url={currentUrl}>
            <SnsBox>
              <img
                className="absolute left-0 top-0 h-full w-full object-cover object-center"
                src={Twitter}
                alt=""
              />
            </SnsBox>
          </TwitterShareButton>
          <KakakoShare>
            <SnsBox>Kakao</SnsBox>
          </KakakoShare>
          <CopyToClipboard text={currentUrl}>
            <button>
              <SnsBox className="rounded border border-gray-200 ">
                <p className="font-bold leading-[20.8px] tracking-custom text-gray-200 underline decoration-2 underline-offset-4">
                  URL
                </p>
              </SnsBox>
            </button>
          </CopyToClipboard>
        </div>
        <div className="mt-6 text-right font-normal leading-[20.8px] text-gray-600">
          <button onClick={handleClose}>취소</button>
        </div>
      </div>
    </Modal>
  );
}

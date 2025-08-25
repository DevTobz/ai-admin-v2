import React from "react";

// components
import { Modal } from "antd";

// constants
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearMessage } from "../../store/slices/message";
import img from "../../constant";

// state

type ISweetAlert = {
  visible: boolean;
  button_name?: string;
  onSubmit?: () => void;
};

const SweetAlert: React.FC<ISweetAlert> = ({
  visible,
  button_name,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(({ message }) => message.message);
  const title = useAppSelector(({ message }) => message.title);

  return (
    <Modal open={visible} centered footer={null} closable={false}>
      <div className="w-full flex flex-col justify-center items-center">
        <p className="mt-5 text-[35px] font-abel text-[#4E4E4E]">{title}</p>
        <div className="md:h-[200px] md:w-[200px]">
          <img src={img.thanks} alt="alert" className="w-full h-full" />
        </div>
        {message && (
          <p
            dangerouslySetInnerHTML={{ __html: message }}
            className="text-[20px] text-center font-abel text-[#4E4E4E] mb-5 pb-4"
          />
        )}
        <button
          type="button"
          className="font-abel bg-[#243677] rounded text-[white] hover:bg-[#CDD8FE] hover:text-[#243677] cursor-pointer text-[18px] px-7 py-3"
          onClick={() => {
            dispatch(clearMessage());
            onSubmit?.();
          }}
        >
          {button_name || "Go back"}
        </button>
      </div>
    </Modal>
  );
};

export default SweetAlert;

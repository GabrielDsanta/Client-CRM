import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";

import { useMediaQuery } from "react-responsive";

interface DeleteClientModalProps {
    isDeleteModalOpen: boolean;
    isLoading: boolean
    onCloseDeleteModal: () => void;
    handleDeleteClient: () => void;
}

export function DeleteClientModal({ isDeleteModalOpen, isLoading, handleDeleteClient, onCloseDeleteModal }: DeleteClientModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Modal
      styles={{
        modal: {
          width: isMobile ? '90%' : "35%",
          borderRadius: 10,
        },
      }}
      showCloseIcon={false}
      open={isDeleteModalOpen}
      onClose={onCloseDeleteModal}
      center
    >
      <div className="w-full flex flex-col items-center pb-3">
        <h1 className="font-semibold text-gray-600 text-xl mb-6">
          Deseja excluir esse cliente ?
        </h1>

        <div className="w-full flex items-center justify-center mr-7 gap-5">
          <button
            onClick={handleDeleteClient}
            className="w-36 h-10 border-[1px] border-[#FF4C51] rounded-md text-[#FF4C51] text-sm font-semibold"
          >
            Sim
          </button>
          <button
            disabled={isLoading}
            onClick={onCloseDeleteModal}
            className="w-36 h-10 border-[1px] border-[#77ABA9] rounded-md text-[#77ABA9] text-sm font-semibold"
          >
            Não
          </button>
        </div>
      </div>
    </Modal>
  );
}

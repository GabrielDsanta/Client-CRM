import "react-responsive-modal/styles.css";

import { TextInput } from "./TextInput";
import { Client } from "@/models/Client";
import { Formik } from "formik";
import { useMediaQuery } from "react-responsive";

import Modal from "react-responsive-modal";

import * as yup from "yup";

type FormDataProps = {
  name: string;
  surName: string;
  email: string;
  phone: string;
};

interface UpdateClientModalProps {
  isUpdateModalOpen: boolean;
  isLoading: boolean;
  client: Client;
  handleSubmitForm: (formData: FormDataProps) => void;
  onCloseUpdateModal: () => void;
}

const ValidationSchemaForm = yup.object({
  name: yup.string().required("Informe o Nome"),
  surName: yup.string().required("Informe o Sobrenome"),
  email: yup.string().required("Informe o E-mail").email("E-mail inválido"),
  phone: yup.string().required("Informe o Telefone"),
});

export function UpdateClientModal({
  isUpdateModalOpen,
  isLoading,
  client,
  onCloseUpdateModal,
  handleSubmitForm,
}: UpdateClientModalProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Modal
      styles={{
        modal: {
          width: isMobile ? "90%" : "100%",
          borderRadius: 10,
        },
      }}
      showCloseIcon={false}
      open={isUpdateModalOpen}
      onClose={onCloseUpdateModal}
      center
    >
      <div className="w-full flex flex-col items-center">
        <h1 className="font-semibold text-gray-600 text-xl mb-6">
          Editar Cliente
        </h1>
        <Formik
          validationSchema={ValidationSchemaForm}
          initialValues={{
            email: client.emails[0]?.email,
            name: client.name,
            phone: client.phone_numbers[0]?.number,
            surName: client.last_name,
          }}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <>
                <TextInput
                  onChange={handleChange("name")}
                  errorMessage={errors.name}
                  value={values.name}
                  placeholder="Nome"
                />

                <TextInput
                  errorMessage={errors.surName}
                  value={values.surName}
                  onChange={handleChange("surName")}
                  placeholder="Sobrenome"
                />

                <TextInput
                  errorMessage={errors.email}
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="E-mail"
                />

                <TextInput
                  errorMessage={errors.phone}
                  value={values.phone}
                  onChange={handleChange("phone")}
                  placeholder="Telefone"
                />

                <div className="w-full flex items-center justify-end mr-7 gap-5">
                  <button
                    onClick={onCloseUpdateModal}
                    className="w-24 h-9 border-[1px] border-[#FFB400] rounded-md text-[#FFB400] text-sm font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={() => handleSubmit()}
                    className="w-24 h-9 border-[1px] border-[#77ABA9] rounded-md text-[#77ABA9] text-sm font-semibold"
                  >
                    Salvar
                  </button>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

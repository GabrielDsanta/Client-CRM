import { UserCirclePlus } from "@phosphor-icons/react";
import { TextInput } from "../components/TextInput";
import { useClient } from "../hooks/useClient";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useMediaQuery } from "react-responsive";

import * as yup from "yup";

type FormDataProps = {
  name: string;
  surName: string;
  email: string;
  phone: string;
};

const ValidationSchemaForm = yup.object({
  name: yup.string().required("Informe o Nome"),
  surName: yup.string().required("Informe o Nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  phone: yup.string().required("Informe o Nome"),
});

export default function Register() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isLoading, setIsLoading] = useState(false);

  const { createClient, getAllClients } = useClient();

  const handleSubmitForm = async (formData: FormDataProps) => {
    try {
      setIsLoading(true);
      const { success } = await createClient.mutateAsync({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        surName: formData.surName,
      });

      setIsLoading(false);

      if (success) {
        toast.dismiss();
        await getAllClients.refetch();
        toast.success("Criado com sucesso !");
      } else {
        toast.dismiss();
        toast.error("Não foi possível criar o Cliente");
      }
    } catch (error) {
      toast.dismiss();
      setIsLoading(true);
      toast.error("Não foi possível criar o Cliente");
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Carregando", {
        style: {
          boxShadow: "none",
          borderRadius: 10,
        },
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full h-[100vh] p-10 bg-[#f4f5fa] flex flex-col">
      <div
        className={`flex gap-1 border-b-2 border-[#77ABA9] w-[8rem] pb-3 text-center items-center justify-center mt-[5%] ml-[5%] ${
          isMobile && "self-center"
        }`}
      >
        <UserCirclePlus size={20} color="#77ABA9" />
        <h1 className="font-semibold text-sm text-[#77ABA9]">CADASTRO</h1>
      </div>

      <div className={`bg-white rounded-lg w-[80%] ml-[5%] mt-5 px-6 py-10 shadow-xl ${isMobile && 'w-full ml-0'}`}>
        <Formik
          validationSchema={ValidationSchemaForm}
          initialValues={{
            email: "",
            name: "",
            phone: "",
            surName: "",
          }}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <div className={`${isMobile && 'flex flex-col items-center'}`}>
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-20 h-10 flex items-center justify-center bg-[#77aba9] rounded-md text-white font-semibold text-sm shadow-xl ${isMobile && 'w-full'}`}
                  onClick={() => handleSubmit()}
                >
                  Salvar
                </button>
              </div>
            );
          }}
        </Formik>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

import { UserCirclePlus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "../components/TextInput";
import { useClient } from "../hooks/useClient";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);

  const { createClient } = useClient();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormDataProps>({
    resolver: yupResolver(ValidationSchemaForm),
  });

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
        toast.success("Criado com sucesso !");
      } else {
        toast.error("Não foi possível criar o Cliente");
      }
    } catch (error) {
      setIsLoading(true);
      toast.error("Não foi possível criar o Cliente");
    }
  };

  return (
    <div className="w-full h-[100vh] p-10 bg-[#f4f5fa] flex flex-col">
      <div className="flex gap-1 border-b-2 border-[#77ABA9] w-[8rem] pb-3 text-center items-center justify-center mt-[5%] ml-[5%]">
        <UserCirclePlus size={20} color="#77ABA9" />
        <h1 className="font-semibold text-sm text-[#77ABA9]">CADASTRO</h1>
      </div>

      <div className="bg-white rounded-lg w-[80%] ml-[5%] mt-5 px-6 py-10 shadow-xl">
        <TextInput
          errorMessage={errors.name?.message}
          value={getValues("name")}
          onChange={(e) => setValue("name", e.target.value)}
          placeholder="Nome"
        />

        <TextInput
          errorMessage={errors.surName?.message}
          value={getValues("surName")}
          onChange={(e) => setValue("surName", e.target.value)}
          placeholder="Sobrenome"
        />

        <TextInput
          errorMessage={errors.email?.message}
          value={getValues("email")}
          onChange={(e) => setValue("email", e.target.value)}
          placeholder="E-mail"
        />

        <TextInput
          errorMessage={errors.phone?.message}
          value={getValues("phone")}
          onChange={(e) => setValue("phone", e.target.value)}
          placeholder="Telefone"
        />

        <button
          disabled={isLoading}
          className="w-20 h-10 flex items-center justify-center bg-[#77aba9] rounded-md text-white font-semibold text-sm shadow-xl"
          onClick={handleSubmit(handleSubmitForm)}
        >
          Salvar
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

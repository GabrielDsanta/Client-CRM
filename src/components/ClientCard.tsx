import { useEffect, useState } from "react";
import { Client } from "../models/Client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useClient } from "../hooks/useClient";
import { DeleteClientModal } from "./DeleteClientModal";
import { UpdateClientModal } from "./UpdateClientModal";
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

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const { name, last_name, emails, phone_numbers } = client;

  const { updateClient, deleteClient, getAllClients } = useClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const onOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const onCloseUpdateModal = () => setIsUpdateModalOpen(false);

  const onOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const onCloseDeleteModal = () => setIsDeleteModalOpen(false);

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
      const { success } = await updateClient.mutateAsync({
        clientId: client.id,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        surName: formData.surName,
      });

      setIsLoading(false);

      if (success) {
        await getAllClients.refetch();
        setIsUpdateModalOpen(false);
        toast.dismiss();
        toast.success("Atualizado com sucesso !");
      } else {
        setIsUpdateModalOpen(false);
        toast.dismiss();
        toast.error("Não foi possível atualizar o Cliente");
      }
    } catch (error) {
      setIsUpdateModalOpen(false);
      setIsLoading(true);
      toast.dismiss();
      toast.error("Não foi possível atualizar o Cliente");
    }
  };

  const handleDeleteClient = async () => {
    try {
      setIsLoading(true);
      const { success } = await deleteClient.mutateAsync({
        clientId: client.id,
      });

      setIsLoading(false);

      if (success) {
        await getAllClients.refetch();
        setIsDeleteModalOpen(false);
        toast.dismiss();
        toast.success("Excluído com sucesso !");
      } else {
        setIsDeleteModalOpen(false);
        toast.dismiss();
        toast.error("Não foi possível excluir o Cliente");
      }
    } catch (error) {
      setIsDeleteModalOpen(false);
      setIsLoading(true);
      toast.dismiss();
      toast.error("Não foi possível excluir o Cliente");
    }
  };

  useEffect(() => {
    setValue("name", name);
    setValue("surName", last_name);
    setValue("email", emails[0]?.email);
    setValue("phone", phone_numbers[0]?.number);
  }, [name, last_name, emails, phone_numbers, setValue]);

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
    <div
      className={`w-full px-6 h-16 flex items-center border-b-[1px] border-[rgba(231, 230, 232, 1)] ${
        isMobile &&
        "flex-col h-auto border-[1px] border-[rgba(231, 230, 232, 1)] p-3 w-full mb-5 rounded-lg px-3"
      }`}
    >
      <h4
        className={`font-bold text-gray-600 w-[25%] mr-3 text-sm ${
          isMobile && "w-full mb-1"
        }`}
      >
        {isMobile && "Nome: "}
        {name}
      </h4>
      <h4
        className={`font-bold text-gray-600 w-[25%] mr-3 text-sm ${
          isMobile && "w-full mb-1"
        }`}
      >
        {isMobile && "Sobrenome: "}
        {last_name}
      </h4>
      <h4
        className={`font-bold text-gray-600 w-[25%] mr-3 text-sm ${
          isMobile && "w-full mb-1"
        }`}
      >
        {isMobile && "E-mail: "}
        {emails[0]?.email}
      </h4>
      <h4
        className={`font-bold text-gray-600 w-[25%] mr-3 text-sm ${
          isMobile && "w-full mb-1"
        }`}
      >
        {isMobile && "Telefone: "}
        {phone_numbers[0]?.number}
      </h4>
      <div
        className={`flex items-center gap-3 w-[25%] ${
          isMobile && "w-full flex-col"
        }`}
      >
        <button
          onClick={onOpenUpdateModal}
          className={`w-16 h-8 border-[1px] border-[#16B1FF] rounded-md text-[#16B1FF] text-xs font-semibold ${
            isMobile && "w-full mt-4"
          }`}
        >
          Editar
        </button>
        <button
          onClick={onOpenDeleteModal}
          className={`w-16 h-8 border-[1px] border-[#FF4C51] rounded-md text-[#FF4C51] text-xs font-semibold ${
            isMobile && "w-full mt-2"
          }`}
        >
          Excluir
        </button>
      </div>

      <UpdateClientModal
        client={client}
        onCloseUpdateModal={onCloseUpdateModal}
        isUpdateModalOpen={isUpdateModalOpen}
        isLoading={isLoading}
        handleSubmitForm={handleSubmitForm}
      />

      <DeleteClientModal
        onCloseDeleteModal={onCloseDeleteModal}
        isLoading={isLoading}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteClient={handleDeleteClient}
      />
    </div>
  );
}

import "react-responsive-modal/styles.css";

import { useEffect, useState } from "react";
import { Client } from "../models/Client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "./TextInput";
import { Toaster, toast } from "react-hot-toast";
import { useClient } from "../hooks/useClient";

import Modal from "react-responsive-modal";

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
    <div className="w-full px-6 h-16 flex items-center border-b-[1px] border-[rgba(231, 230, 232, 1)]">
      <h4 className="font-bold text-gray-600 w-[25%] mr-3 text-sm">{name}</h4>
      <h4 className="font-bold text-gray-600 w-[25%] mr-3 text-sm">
        {last_name}
      </h4>
      <h4 className="font-bold text-gray-600 w-[25%] mr-3 text-sm">
        {emails[0]?.email}
      </h4>
      <h4 className="font-bold text-gray-600 w-[25%] mr-3 text-sm">
        {phone_numbers[0]?.number}
      </h4>
      <div className="flex items-center gap-3 w-[25%]">
        <button
          onClick={onOpenUpdateModal}
          className="w-16 h-8 border-[1px] border-[#16B1FF] rounded-md text-[#16B1FF] text-xs font-semibold"
        >
          Editar
        </button>
        <button
          onClick={onOpenDeleteModal}
          className="w-16 h-8 border-[1px] border-[#FF4C51] rounded-md text-[#FF4C51] text-xs font-semibold"
        >
          Excluir
        </button>
      </div>

      <Modal
        styles={{
          modal: {
            width: "100%",
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
          <TextInput
            errorMessage={errors.name?.message}
            defaultValue={getValues("name")}
            onChange={(e) => setValue("name", e.target.value)}
            placeholder="Nome"
          />

          <TextInput
            errorMessage={errors.surName?.message}
            defaultValue={getValues("surName")}
            onChange={(e) => setValue("surName", e.target.value)}
            placeholder="Sobrenome"
          />

          <TextInput
            errorMessage={errors.email?.message}
            defaultValue={getValues("email")}
            onChange={(e) => setValue("email", e.target.value)}
            placeholder="E-mail"
          />

          <TextInput
            errorMessage={errors.phone?.message}
            defaultValue={getValues("phone")}
            onChange={(e) => setValue("phone", e.target.value)}
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
              onClick={handleSubmit(handleSubmitForm)}
              className="w-24 h-9 border-[1px] border-[#77ABA9] rounded-md text-[#77ABA9] text-sm font-semibold"
            >
              Salvar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        styles={{
          modal: {
            width: "35%",
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

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

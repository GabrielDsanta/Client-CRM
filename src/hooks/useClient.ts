import { Client } from "../models/Client";
import { ClientService } from "../services/ClientService";
import { useMutation, useQuery } from "react-query";

export const useClient = () => {
  const getAllClients = useQuery<Client[]>(["getAllClients"], async () => {
    const { data, success } = await ClientService.getAllClients();
    if (success) {
      const sortedClients = data.data.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      return sortedClients;
    }
    return { success: false };
  });

  const createClient = useMutation(
    async ({
      name,
      surName,
      email,
      phone,
    }: {
      name: string;
      surName: string;
      email: string;
      phone: string;
    }) => {
      const { data, success, error } = await ClientService.createClient(
        name,
        surName,
        email,
        phone
      );

      return { data, success, error };
    }
  );

  const updateClient = useMutation(
    async ({
      clientId,
      name,
      surName,
      email,
      phone,
    }: {
      clientId: string;
      name: string;
      surName: string;
      email: string;
      phone: string;
    }) => {
      const { data, success, error } = await ClientService.updateClient(
        clientId,
        name,
        surName,
        email,
        phone
      );

      return { data, success, error };
    }
  );

  const deleteClient = useMutation(
    async ({ clientId }: { clientId: string }) => {
      const { data, success, error } = await ClientService.deleteClient(
        clientId
      );

      return { data, success, error };
    }
  );

  return {
    createClient,
    updateClient,
    deleteClient,
    getAllClients
  };
};

import { ClientService } from "../services/ClientService";
import { useMutation } from "react-query";

export const useClient = () => {
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

  return {
    createClient,
  };
};

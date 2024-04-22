import host from "../utils/host";
import axios from "axios";

export class ClientService {
  static async getAllClients() {
    const url = `${host()}/crm/leads`;

    try {
      const response = await (
        await this.getAxiosInstance()
      ).get(url);

      if (response.status === 200) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };
      return {
        error: "Erro ao buscar Clientes.",
        success: false,
      };
    }
  }

  static async createClient(
    name: string,
    surName: string,
    email: string,
    phone: string
  ) {
    const url = `${host()}/crm/leads`;

    try {
      const response = await (
        await this.getAxiosInstance()
      ).post(url, {
        first_name: name,
        last_name: surName,
        phone_numbers: [
          {
            type: "primary",
            number: phone,
          },
        ],
        emails: [
          {
            type: "primary",
            email,
          },
        ],
        name,
        company_name: "",
      });

      if (response.status === 201) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };
      return {
        error: "Erro ao criar Cliente.",
        success: false,
      };
    }
  }

  static async updateClient(
    clientId: string,
    name: string,
    surName: string,
    email: string,
    phone: string
  ) {
    const url = `${host()}/crm/leads/${clientId}`;

    try {
      const response = await (
        await this.getAxiosInstance()
      ).patch(url, {
        first_name: name,
        last_name: surName,
        phone_numbers: [
          {
            type: "primary",
            number: phone,
          },
        ],
        emails: [
          {
            type: "primary",
            email,
          },
        ],
        name,
        company_name: "",
      });

      if (response.status === 200) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };
      return {
        error: "Erro ao editar Cliente.",
        success: false,
      };
    }
  }

  static async deleteClient(clientId: string) {
    const url = `${host()}/crm/leads/${clientId}`;

    try {
      const response = await (await this.getAxiosInstance()).delete(url);

      if (response.status === 200) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };
      return {
        error: "Erro ao deletar Cliente.",
        success: false,
      };
    }
  }

  static async getClients() {
    const url = `${host()}/crm/leads`;

    try {
      const response = await (await this.getAxiosInstance()).get(url);

      if (response.status === 200) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false,
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        };
      return {
        error: "Erro ao buscar Clientes.",
        success: false,
      };
    }
  }

  static async getAxiosInstance() {
    return axios.create({
      baseURL: `${host()}/crm/leads`,
      headers: {
        Authorization:
          "Bearer sk_live_be5a776a-b0df-4256-878f-41727e2fc4a0-ssQBcGmN0F9JaDEgoTL-02a0ff4b-0aab-4561-9c71-5d150c945a17",
        "x-apideck-app-id": "KYL3WWsNu0PidZCgoSYm3Fzhl97EqGJ4h1goTK",
        "x-apideck-consumer-id": "7Vk4oyvTw3zjdZ9",
        "x-apideck-service-id": "hubspot",
      },
    });
  }
}

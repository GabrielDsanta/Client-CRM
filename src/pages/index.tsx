import { ListDashes } from "@phosphor-icons/react";
import { ClientCard } from "../components/ClientCard";
import { Client } from "../models/Client";
import { useClient } from "../hooks/useClient";

export default function Home() {
  const { getAllClients } = useClient();
  const { data: clients } = getAllClients;

  return (
    <div className="w-full h-[100vh] p-10 bg-[#f4f5fa] flex flex-col">
      <div className="flex gap-1 border-b-2 border-[#77ABA9] w-[8rem] pb-3 text-center items-center justify-center mt-[5%] ml-[5%]">
        <ListDashes size={20} color="#77ABA9" />
        <h1 className="font-semibold text-sm text-[#77ABA9]">LISTAR</h1>
      </div>

      <button onClick={() => getAllClients.refetch()}>teste</button>

      <div className="bg-white rounded-lg w-[80%] ml-[5%] mt-5 py-7 shadow-xl">
        <h2 className="font-semibold text-[#404040] text-lg mx-6">
          Lista de Clientes
        </h2>

        <div className="flex items-center w-full bg-[#f9fafc] px-6 h-14 mt-4 border-b-[1px] border-[rgba(231, 230, 232, 1)]">
          <h3 className="text-[#404040] font-semibold text-xs w-[25%] border-r-2 border-[rgba(58, 53, 65, 0.12)] mr-3">
            NOME
          </h3>
          <h3 className="text-[#404040] font-semibold text-xs w-[25%] border-r-2 border-[rgba(58, 53, 65, 0.12)] mr-3">
            SOBRENOME
          </h3>
          <h3 className="text-[#404040] font-semibold text-xs w-[25%] border-r-2 border-[rgba(58, 53, 65, 0.12)] mr-3">
            EMAIL
          </h3>
          <h3 className="text-[#404040] font-semibold text-xs w-[25%] border-r-2 border-[rgba(58, 53, 65, 0.12)] mr-3">
            NÚMERO
          </h3>
          <h3 className="text-[#404040] font-semibold text-xs w-[25%]">
            AÇÕES
          </h3>
        </div>

        <div className="overflow-auto h-[57vh]">
          {clients &&
            clients?.map((item: Client) => {
              return <ClientCard client={item} key={item.id} />;
            })}
        </div>
      </div>
    </div>
  );
}

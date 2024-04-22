import { ListDashes } from "@phosphor-icons/react";
import { ClientCard } from "../components/ClientCard";
import { Client } from "../models/Client";
import { useClient } from "../hooks/useClient";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { getAllClients } = useClient();
  const { data: clients } = getAllClients;

  return (
    <div className={`w-full h-[100vh] p-10 bg-[#f4f5fa] flex flex-col ${isMobile && 'p-3'}`}>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`flex gap-1 border-b-2 border-[#77ABA9] w-[8rem] pb-3 text-center items-center justify-center mt-[5%] ml-[5%] ${
          isMobile && "self-center"
        }`}
      >
        <ListDashes size={20} color="#77ABA9" />
        <h1 className="font-semibold text-sm text-[#77ABA9]">LISTAR</h1>
      </div>

      <div
        className={`bg-white rounded-lg w-[80%] ml-[5%] mt-5 px-6 py-10 shadow-xl ${
          isMobile && "w-full ml-0 px-2"
        }`}
      >
        <h2
          className={`font-semibold text-[#404040] text-lg mx-6 ${
            isMobile && "text-center mb-3"
          }`}
        >
          Lista de Clientes
        </h2>

        {!isMobile && (
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
        )}

        <div className="overflow-auto h-[57vh]">
          {clients ? (
            clients?.map((item: Client) => {
              return <ClientCard client={item} key={item.id} />;
            })
          ) : (
            <div className="w-full flex items-center justify-center mt-auto h-full">
              <div
                className="w-8 h-8 border-2 border-solid rounded-full animate-spin"
                style={{ borderTopColor: "#163172" }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

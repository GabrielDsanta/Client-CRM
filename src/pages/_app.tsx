import "../../styles/globals.css";

import { AsideBar } from "../components/AsideBar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full flex">
        <AsideBar />

        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;

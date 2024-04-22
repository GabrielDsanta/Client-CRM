import "../../styles/globals.css";

import { AsideBar } from "../components/AsideBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMediaQuery } from "react-responsive";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`w-full h-[100vh] flex ${isMobile && 'flex-col h-[100vh'}`}>
        <AsideBar />

        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;

import { DiscordLogo, ListDashes, UserCirclePlus } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import Link from "next/link";

export function AsideBar() {
  const router = useRouter();
  const { pathname } = router;

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [currentScreen, setCurrentScreen] = useState<String>(pathname);

  const navigationLinks = [
    {
      path: "/",
      title: "Listar",
      icon: <ListDashes size={24} color="#3a3541" />,
    },
    {
      path: "/register",
      title: "Cadastro",
      icon: <UserCirclePlus size={24} color="#3a3541" />,
    },
  ];

  return (
    <>
      {isMobile && (
        <div className="bg-[#64777a] w-full pb-5">
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex flex-col items-center justify-center">
              <DiscordLogo
                weight="fill"
                color="white"
                size={80}
                className="mt-9"
              />
              <ul className="flex flex-col items-center gap-4 mt-8">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} prefetch={false} title={link.title}>
                      <button
                        className={`flex items-center justify-start w-60 rounded-r-full h-9 gap-2 mr-5 pl-5  ${
                          currentScreen === link.path &&
                          "bg-[rgba(255,255,255,0.05)]"
                        } `}
                        onClick={() => setCurrentScreen(link.path)}
                      >
                        {link.icon}
                        <h2 className="text-[#3a3541]">{link.title}</h2>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="bg-[#64777a] flex flex-col items-center w-[13%] h-[100vh]">
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex flex-col items-center justify-center">
              <DiscordLogo
                weight="fill"
                color="white"
                size={80}
                className="mt-9"
              />
              <ul className="flex flex-col items-center gap-4 mt-8">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.path} prefetch={false} title={link.title}>
                      <button
                        className={`flex items-center justify-start w-60 rounded-r-full h-9 gap-2 mr-5 pl-5  ${
                          currentScreen === link.path &&
                          "bg-[rgba(255,255,255,0.05)]"
                        } `}
                        onClick={() => setCurrentScreen(link.path)}
                      >
                        {link.icon}
                        <h2 className="text-[#3a3541]">{link.title}</h2>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

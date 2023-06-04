import { useState, useEffect, Fragment } from "react";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import { Transition } from "@headlessui/react";

export default function Layout({ children }: any) {
    const [Nav, setShowNav] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    function handleResize() {
        if (innerWidth <= 640) {
        setShowNav(false);
        setIsMobile(true);
        } else {
        setShowNav(true);
        setIsMobile(false);
        }
    }

    useEffect(() => {
        if (typeof window != undefined) {
        addEventListener("resize", handleResize);
        }

        return () => {
        removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <TopBar showNav={Nav} setShowNav={setShowNav} />
            <Transition
                as={Fragment}
                show={Nav}
                enter="transform transition duration-[400ms]"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform duration-[400ms] transition ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <SideBar showNav={Nav} />
            </Transition>
            <main
                className={`pt-16 transition-all duration-[400ms] ${
                    Nav && !isMobile ? "pl-56" : ""
                }`}
            >
            <div className="px-4 md:px-16">{children}</div>
            </main>
        </>
    );
}
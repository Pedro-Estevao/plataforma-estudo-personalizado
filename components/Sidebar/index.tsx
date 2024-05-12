'use client';

import { useAppContext } from "@/contexts/appContext";
import Image from "next/image";
import React from "react";
import { CloseIcon, LockIcon, LockIconFill, UnLockIcon, UnLockIconFill } from "../Icons";

const Sidebar = () => {
    const { sidebar, studyPlatform } = useAppContext();

    return (
        <>
            <div className={`fixed inset-0 bg-[#111827] opacity-[0.81] ${sidebar.expanded ? "visible" : "invisible"} z-[49]`} />
            <div className={`fixed top-0 bottom-0 z-50 flex w-[288px] flex-col transition-transform ${sidebar.expanded ? "max-lg:translate-x-0" : "max-lg:-translate-x-[100%]"}`}>
                <div className="flex flex-col flex-grow gap-y-5 bg-[white] dark:bg-[#111827] border-[#e5e7eb] dark:border-[#3b3b3b] dark:shadow-navbar-dark border-r-[1px] overflow-y-auto px-6 pb-4">
                    <div className="flex flex-shrink-0 justify-between items-center h-16">
                        <Image src={'/imgs/gemini-logo.png'} className="w-auto h-11 block align-middle" width={120} height={45} alt="Logo do Gemini" />
                        <div className="flex items-center lg:hidden">
                            <CloseIcon 
                                className="ml-auto w-6 h-6 cursor-pointer text-default-500 dark:text-[white]" 
                                onClick={() => {
                                    const button = document.getElementById('navbar-toggle');

                                    if (button) {
                                        button.click();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <nav className="flex flex-um flex-col">
                        <ul role="list" className="flex flex-um flex-col gap-y-7 list-none m-0 p-0">
                            <li className="">
                                <ul role="list" className="flex flex-col gap-y-[4px] list-none m-0 p-0 -mx-2">
                                    {studyPlatform.modulos.map((modulo, index) => (
                                        <li key={index} className={!modulo.isOpen ? "select-none pointer-events-none" : ""}>
                                            <div className="flex gap-x-3 items-center cursor-pointer rounded-[0.375rem] p-2 text-[0.875rem] font-semibold leading-7 hover:bg-[#f9fafb] dark:hover:bg-[#1f2937] text-[#374151] dark:text-[#9ca3af] group hover:text-[#4f46e5] dark:hover:text-[white]">
                                                <span className="flex w-[24] h-[24] min-w-[24] min-h-[24px]">
                                                    {modulo.isOpen ? (
                                                        <UnLockIconFill className="text-[#9ca3af] group-hover:text-[#4f46e5] dark:group-hover:text-[white]" size={24} />
                                                    ) : (
                                                        <LockIcon className="text-[#9ca3af] group-hover:text-[#4f46e5] dark:group-hover:text-[white]" size={24} />
                                                    )}
                                                </span>
                                                <span className="text-medium whitespace-nowrap text-ellipsis box-border list-none font-semibold overflow-hidden">
                                                    {modulo.title}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
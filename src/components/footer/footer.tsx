import React, { useState } from "react";
import { FaFacebook, FaCrown, FaAngleRight } from "react-icons/fa";
import Logo from "../../../public/Logo.png"
import Image from "next/image";
import { NextRouter, Router, useRouter } from "next/router";
import { Button, Modal } from 'flowbite-react';
import { ModalInterface } from "flowbite";
import { modalOptions } from "@/src/libs/modalOption";
export const DevTeamModal = () => {
    const router: NextRouter = useRouter()
    
    const [modalIsOpen, SetmodalIsOpen]=useState(false);
    
    const handleModalOpen = () =>{
        SetmodalIsOpen(true)
      }

    return (
        
        <>
            <span className="hover:text-pink-400 font-semibold cursor-pointer" onClick={handleModalOpen}>
						Developers Team{" "}
			</span>
            <Modal
                onClose={() => SetmodalIsOpen(false)}
                show={modalIsOpen}
            >
            <Modal.Header>
                Developers Team
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                <p className="lg:text-lg md:text-md sm:text-sx items-center text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <p className="lg:text-lg md:text-md sm:text-sx flex items-center mb-3">
                        <FaCrown className="mr-1"/>สุธางค์ สุขเรืองกูล <FaAngleRight className="mr-2 ml-3"/> Head Developer
                    </p>
                    <p className="lg:text-lg md:text-md sm:text-sx flex items-center mb-3">
                        ❤  ณัฐดนัย มักเจริญผล <FaAngleRight className="mr-2 ml-3"/> Data Handler
                    </p>
                    <p className="lg:text-lg md:text-md sm:text-sx flex items-center">
                        ❤  เจตนิพัทธ์ อัครเดชาเกียรติ <FaAngleRight className="mr-2 ml-3"/> Data Handler
                    </p>
                </p>
                </div>
            </Modal.Body>
            </Modal>
        </>
    )
}

function Footer() {
    const router: NextRouter = useRouter()
	return (
		<>
			<div className="bg-gradient-to-b from-white via-white to-orange-300 h-auto w-full flex md:flex-row flex-col justify-around items-center">
				<div className="p-5">
					<ul>
						<p className="items-center text-gray-500 font-bold md:text-sm sm:text-sm lg:text-2xl pb-6">
                            <span className="flex items-center">
                                <Image className="mr-2" width={100} height={100} src={Logo} alt="company logo" />
                                ชมรม
                                <div className="text-red-500 ml-1">ทูบีนัมเบอร์วัน</div>
                            </span>
						</p>                                                                                                                                                                                                                                                                                                                                
						<div className="flex gap-6 pb-5">
							<FaFacebook onClick={() => router.push("https://www.facebook.com/profile.php?id=100063686794660")} className="text-2xl cursor-pointer hover:text-blue-600" />
						</div>
					</ul>
				</div>
			</div>
			<div className="bg-orange-300 flex flex-col justify-center items-center text-center p-5 bg-gray-50">
				<h1 className="text-gray-800 font-semibold">
					© 2023 All rights reserved | Build with ❤ by{" "}
					<DevTeamModal></DevTeamModal>
				</h1>
			</div>
		</>
	);
}

export default Footer;
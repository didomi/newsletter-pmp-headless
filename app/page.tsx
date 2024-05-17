'use client';

declare global {
  interface Window {
    Didomi: any;
    DidomiWidgets: any;
    didomiWidgetsOnReady: any[];
  }
}

import React, { useEffect, useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link, Input, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";


const Logo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);


export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const initialized = useRef(false);
  const buttonRef: any = useRef(null);

  const [container, setContainer] = useState({
    id: null
  });
  const [entities, setEntities] = useState({
    purposes: [],
  });


  useEffect(() => {
    setTimeout(() => {
      onOpen()
    }, 3000)
  }, [onOpen])

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      window.didomiWidgetsOnReady = window.didomiWidgetsOnReady || [];

      window.didomiWidgetsOnReady.push(async (DidomiWidgets: any) => {
        const container = await DidomiWidgets.getContainerById("cEQF6Jbb");
        const entities = await container.getEntities();
        setContainer(container);
        setEntities(entities);
      });
    }

  }, [setIsLoading])

  const sendConsentToDidomi = async () => {
    const consentToPurpose = new CustomEvent("didomi:set-consents", {
      detail: {
        purposeId: "audientse-fxqe89b2",
        preferenceId: "jmHmf37H",
        value: "dK7rBBXk",
      },
      bubbles: true,
      composed: true,
    });
    if (buttonRef.current && buttonRef.current) {
      buttonRef.current.dispatchEvent(consentToPurpose);
    }
    setIsLoading(false);
    onClose();
    setInputValue('');
  }

  const handleSendEmail = () => {
    setIsLoading(true)
    fetch('/api/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: inputValue }),
    }).then(response => response.json()).then(data => {
      window.DidomiWidgets.updateToken(data.token);
      sendConsentToDidomi();
    });
  }

  const handleInputValue = (value: string) => {
    setInputValue(value);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900">

      <Navbar position="sticky" maxWidth="full">
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">DEMO</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Menu 1
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Menu 2
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" target="_blank" href="https://didomi-pre-release-hmecxwcr.preference-center.org/">
              My Preferences
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
        </NavbarContent>
      </Navbar>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        radius="none"
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1"><h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-gray-400">Melody Maker</h1></ModalHeader>
              <ModalBody>
                <p className="text-gray-400 max-w-md">
                  Melody Maker is a talented musician who crafts soulful, emotive tracks that captivate listeners. With a
                  unique blend of indie, folk, and electronic influences, their music takes you on a journey through the
                  depths of human experience.
                </p>
                <Input
                  className="mb-3"
                  radius="none"
                  onValueChange={handleInputValue}
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered" />

                <didomi-container-headless id="cEQF6Jbb" className="flex flex-col items-center justify-center ">
                  {container.id && (
                    <>
                      <didomi-consent-asked
                        container-id={container.id}
                      ></didomi-consent-asked>

                      <span className="text-gray-400 max-w-md mr-3">
                        <didomi-entity-content
                          entity-id="dK7rBBXk"
                          entity-property="name"
                          entity-type="preference-value"
                          container-id={container.id}
                          with-component-content={true}
                        ></didomi-entity-content>
                      </span>

                      <didomi-consent-receiver container-id={container.id}>
                        {entities && (
                          <Button ref={buttonRef} radius="none" isLoading={isLoading} isDisabled={!inputValue} onPress={handleSendEmail}>Subscribe</Button>
                        )}
                      </didomi-consent-receiver>
                    </>
                  )}
                </didomi-container-headless>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 md:px-6">
        <section className="container max-w-4xl py-12 md:py-24 lg:py-32">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-gray-400">Melody Maker</h1>
              <p className="text-gray-400 max-w-md">
                Melody Maker is a talented musician who crafts soulful, emotive tracks that captivate listeners. With a
                unique blend of indie, folk, and electronic influences, their music takes you on a journey through the
                depths of human experience.
              </p>
            </div>
            <Image
              radius="none"
              alt="Melody Maker"
              className="object-cover"
              height={600}
              src="	https://generated.vusercontent.net/placeholder.svg"
              style={{
                aspectRatio: "600/600",
                objectFit: "cover",
              }}
              width={600}
            />
          </div>
        </section>
        <section className="container max-w-4xl pb-12 md:pb-24 lg:pb-32">
          <h2 className="text-2xl font-bold mb-8 text-gray-400">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link className="group" href="#">
              <div className="aspect-square overflow-hidden">
                <Image
                  radius="none"
                  alt="Album Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  height={300}
                  src="	https://generated.vusercontent.net/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
              </div>
              <p className="ml-2 mt-2 text-left text-gray-400 group-hover:text-gray-50 transition-colors">
                Soulful Melodies
              </p>
            </Link>
            <Link className="group" href="#">
              <div className="aspect-square overflow-hidden">
                <Image
                  radius="none"
                  alt="Album Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  height={300}
                  src="	https://generated.vusercontent.net/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
              </div>
              <p className="ml-2 mt-2 text-left text-gray-400 group-hover:text-gray-50 transition-colors">
                Ethereal Harmonies
              </p>
            </Link>
            <Link className="group" href="#">
              <div className="aspect-square overflow-hidden">
                <Image
                  radius="none"
                  alt="Album Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  height={300}
                  src="	https://generated.vusercontent.net/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
              </div>
              <p className="ml-2 mt-2 text-left text-gray-400 group-hover:text-gray-50 transition-colors">
                Rhythmic Odyssey
              </p>
            </Link>
            <Link className="group" href="#">
              <div className="aspect-square overflow-hidden">
                <Image
                  radius="none"
                  alt="Album Cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  height={300}
                  src="	https://generated.vusercontent.net/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
              </div>
              <p className="ml-2 mt-2 text-left text-gray-400 group-hover:text-gray-50 transition-colors">
                Emotive Landscapes
              </p>
            </Link>
          </div>
        </section>
      </main>



    </main>
  );
}
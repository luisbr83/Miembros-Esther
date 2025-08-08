"use client";

import { signOut } from "firebase/auth";
import { BookOpen, LogOut, Star, Expand, Minimize } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/firebase";

export default function MembersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The AuthProvider will handle the redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch((err) => {
        alert(
          `Error al intentar habilitar el modo de pantalla completa: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  const toggleFullscreenBonus = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch((err) => {
        alert(
          `Error al intentar habilitar el modo de pantalla completa: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Bienvenida | Método Esther</title>
      </Head>
      <div className="min-h-screen bg-background">
        <header className="flex items-center justify-between border-b bg-card p-4 shadow-sm">
          <h1 className="font-headline text-xl font-bold text-primary md:text-2xl">
            Método Esther
          </h1>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user?.email}
            </span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </header>

        <main className="container mx-auto p-4 py-8 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              ¡Bienvenida, Mujer de Dios!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Explora el contenido exclusivo que hemos preparado para ti.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-foreground">
                  Método Esther
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sumérgete en las enseñanzas y transforma tu viaje. Esta es tu
                  guía principal para una vida con más propósito y fe.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-full">Accede Aquí</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeader className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>El Método Esther</DialogTitle>
                        <DialogDescription>
                          Tu guía para una vida con más propósito y fe.
                        </DialogDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        aria-label="Pantalla completa"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Expand className="h-5 w-5" />
                        )}
                      </Button>
                    </DialogHeader>
                    <ScrollArea className="flex-grow h-full">
                      <iframe
                        ref={iframeRef}
                        src="/MetodoEsther.html" // Your file name in public (preferably without accents or spaces)
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Ebook Método Esther"
                        allowFullScreen
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-foreground">
                  Contenido Extra
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Materiales complementarios, videos y audios exclusivos para
                  profundizar tu conocimiento y fortalecer tu camino.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-full">Ver Contenido Extra</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeader className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>Extra - Guía de Preparación de Sermones</DialogTitle>
                        <DialogDescription>
                          Material adicional para profundizar tu preparación ministerial.
                        </DialogDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreenBonus}
                        aria-label="Pantalla completa"
                      >
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Expand className="h-5 w-5" />
                        )}
                      </Button>
                    </DialogHeader>
                    <ScrollArea className="flex-grow h-full">
                      <iframe
                        ref={iframeRef}
                        src="/ME.html" // Put the exact name of the file that is in public here
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Guía de Preparación de Sermones"
                        allowFullScreen
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

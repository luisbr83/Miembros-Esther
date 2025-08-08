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
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
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
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
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
        <title>Bem-vinda | Método Esther</title>
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
              Sair
            </Button>
          </div>
        </header>

        <main className="container mx-auto p-4 py-8 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Bem-vinda, Mulher de Deus!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Explore o conteúdo exclusivo que preparamos para você.
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
                  Mergulhe nos ensinamentos e transforme sua jornada. Este é o
                  seu guia principal para uma vida com mais propósito e fé.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-full">Acesse Aqui</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeader className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>O Método Esther</DialogTitle>
                        <DialogDescription>
                          Seu guia para uma vida com mais propósito e fé.
                        </DialogDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreen}
                        aria-label="Tela cheia"
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
                        src="/MetodoEsther.html" // Nome do seu arquivo no public (sem acento e espaço de preferência)
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
                  Conteúdo Bônus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Materiais complementares, vídeos e áudios exclusivos para
                  aprofundar seu conhecimento e fortalecer sua caminhada.
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 w-full">Ver Bônus</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[80vh] flex flex-col">
                    <DialogHeader className="flex-row items-center justify-between">
                      <div>
                        <DialogTitle>Bônus - Guia de Preparação de Sermones</DialogTitle>
                        <DialogDescription>
                          Material extra para aprofundar seu preparo ministerial.
                        </DialogDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFullscreenBonus}
                        aria-label="Tela cheia"
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
                        src="/ME.html" // Coloque aqui o nome exato do arquivo que está em public
                        width="100%"
                        height="100%"
                        style={{ border: "none", minHeight: "70vh" }}
                        title="Guia de Preparação de Sermones"
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

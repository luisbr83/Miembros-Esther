"use client";

import { signOut } from "firebase/auth";
import { BookOpen, LogOut, Star } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/firebase";

export default function MembersPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The AuthProvider will handle the redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
                  Ebook: O Método Esther
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mergulhe nos ensinamentos e transforme sua jornada. Este é o
                  seu guia principal para uma vida com mais propósito e fé.
                </p>
                <Button className="mt-4 w-full">Acessar Ebook</Button>
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
                <Button className="mt-4 w-full">Ver Bônus</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}

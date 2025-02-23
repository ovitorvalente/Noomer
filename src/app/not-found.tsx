import { ArrowUpLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter max-md:text-3xl sm:text-5xl">
            Ops! Página não encontrada
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Desculpe, não conseguimos encontrar a página que você está
            procurando.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant={"destructive"}>Teste</Button>
          <Button size={"lg"} variant={"default"} asChild>
            <Link href="/" className="flex items-center justify-center">
              <ArrowUpLeftIcon className="mr-2 size-4" />
              Voltar ao início
            </Link>
          </Button>
          {/* <Button variant="outline" asChild>
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 size-4" />
              Voltar
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}

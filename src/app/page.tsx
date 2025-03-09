import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-center p-4">
        <Button asChild variant={"secondary"} size={"sm"}>
          <Link href={"/restaurantes"}>Restaurantes</Link>
        </Button>
      </header>
    </main>
  );
}

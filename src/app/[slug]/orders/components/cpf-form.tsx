"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";

type formSchema = z.infer<typeof formSchema>;

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "Por favor, insira seu CPF",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
});

export function CpfForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const pathName = usePathname();
  const onSubmit = (data: formSchema) => {
    router.push(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Dialog open={true}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle>Quase lá!</DialogTitle>
            <DialogDescription className="max-w-[80%] text-center">
              Para visualizar seus pedidos, insira seu CPF abaixo.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-6"
            >
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div className="flex items-center justify-center gap-1">
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleCancel()}
                      className="w-full rounded-full font-bold"
                      size={"lg"}
                      variant="secondary"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    size={"lg"}
                    variant={"destructive"}
                    className="w-full rounded-full font-bold"
                  >
                    Confirmar
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}

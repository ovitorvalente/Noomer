"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { z } from "zod";
import { isValidCpf } from "../helpers/cpf";
import { useForm, FormProvider } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Por favor, insira seu nome",
  }),
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

export function FinishOrderDrawer({
  open,
  onOpenChange,
}: FinishOrderDrawerProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Preencha seus dados para continuar.
          </DrawerDescription>
        </DrawerHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
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

            <DrawerFooter>
              <Button type="submit" size={"lg"} variant={"destructive"}>
                Finalizar Pedido
              </Button>
              <DrawerClose asChild>
                <Button className="w-full" size={"lg"} variant="secondary">
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

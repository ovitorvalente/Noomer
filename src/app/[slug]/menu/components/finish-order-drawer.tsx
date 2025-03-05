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
import { createOrder } from "../actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { useContext, useState, useTransition } from "react";
import { CartContext } from "../contexts/cart";
import { Loader2Icon } from "lucide-react";
import { OrderPlaced } from "./order-placed";

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
  const { slug } = useParams<{ slug: string }>();
  const SearchParams = useSearchParams();
  const { products } = useContext(CartContext);
  const [isPending, startTransition] = useTransition();
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = SearchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;
      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerName: data.name,
          customerCpf: data.cpf,
          products: products,
          restaurantSlug: slug,
        });
        onOpenChange(false);
        setIsOrderPlaced(true);
      });
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center justify-center gap-4">
            <DrawerTitle>Quase lá!</DrawerTitle>
            <DrawerDescription className="max-w-[80%] text-center">
              Para finalizar o seu pedido, insira os seus dados abaixo.
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
                    <FormLabel>Seu nome</FormLabel>
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

              <DrawerFooter className="pb-12">
                <div className="flex items-center justify-center gap-1">
                  <DrawerClose asChild>
                    <Button
                      className="w-full rounded-full font-bold"
                      size={"lg"}
                      variant="secondary"
                    >
                      Cancelar
                    </Button>
                  </DrawerClose>
                  <Button
                    type="submit"
                    size={"lg"}
                    variant={"destructive"}
                    disabled={isPending}
                    className="w-full rounded-full font-bold"
                  >
                    {isPending && <Loader2Icon className="animate-spin" />}
                    Finalizar
                  </Button>
                </div>
              </DrawerFooter>
            </form>
          </FormProvider>
        </DrawerContent>
      </Drawer>
      <OrderPlaced
        open={isOrderPlaced}
        onOpenChange={setIsOrderPlaced}
        restaurantSlug={slug}
      />
    </>
  );
}

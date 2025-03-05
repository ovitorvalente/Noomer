"use client";
import { Badge } from "@/components/ui/badge";

export function OrderItem() {
  return (
    <>
      <div className="flex w-full flex-col gap-8 rounded-2xl border p-5">
        <Badge className="w-fit" variant={"secondary"}>
          Em preparo
        </Badge>

        <div className="">
          <h3 className="">FSW Donald's</h3>
        </div>
      </div>
    </>
  );
}

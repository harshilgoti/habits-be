"use client";
import data from "./_components/data.json";
import { DataTable } from "./_components/data-table";
import { useRouter } from "next/navigation";
import { useAuth } from "../(auth)/_components/auth-provider";

export default function Page() {
  // const router = useRouter();
  // const { user } = useAuth();
  // if (!user) {
  //   router.push("/login");
  // }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <DataTable data={data} />
      </div>
    </div>
  );
}

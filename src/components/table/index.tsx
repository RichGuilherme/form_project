import { useEffect, useState } from "react";
import { columns } from "./columns";

import useStoreValue from "@/storage/storeValue";
import { DataTable } from "./dataTable";
import { Payment } from "@/type";


export default function ComponentTable() {
  const data = useStoreValue(state => state.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-10">
      <DataTable columns={columns} data={data as Payment[]} />
    </section>
  );
}
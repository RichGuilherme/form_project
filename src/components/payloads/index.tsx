import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./dataTable";
import useStoreValue from "@/storage/storeValue";


export default function ComponentTable() {
  const { data } = useStoreValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(false);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-10">
      <DataTable columns={columns} data={data} />
    </section>
  );
}
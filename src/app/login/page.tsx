import Button from "@components/Button";
import { createClient } from "@utils/supabase/server";
import Test from "./test";

export default async function Page() {
  return (
    <>
      <h1>Login page</h1>
      <Test />
    </>
  );
}

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="homepage">
        {
          user ? (
            <div>
              <form action={
                async () => {
                  "use server";
                  await signOut();
                }
              }>
                <Button type="submit">logout</Button>
              </form>
            </div>
          ) : (
            <div className="auth">
              <Link href='\login' >
                <Button>Login</Button>
              </Link>
              <Link href='\signup' >
                <Button>Signup</Button>
              </Link>
            </div>
          )
        }

        <div className="flex justify-center text-4xl font-bold">welcome to my homepage</div>
      </div>
    </>
  );
}

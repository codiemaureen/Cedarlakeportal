'use client';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
export function SignOut(){
 const router=useRouter();
 async function signOut(){await createClient().auth.signOut();router.replace('/login');router.refresh();}
 return <button onClick={signOut} type="button">Sign out</button>;
}

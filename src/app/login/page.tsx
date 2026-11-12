'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
export default function Login(){
 const router=useRouter();const [email,setEmail]=useState('');const [password,setPassword]=useState('');
 const [error,setError]=useState('');const [loading,setLoading]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setError('');setLoading(true);
  try{const {error}=await createClient().auth.signInWithPassword({email,password});if(error){setError('Unable to sign in. Check your email and password.');return;}router.replace('/dashboard');router.refresh();}
  catch{setError('Unable to connect. Please try again.');}finally{setLoading(false);}
 }
 return <main style={{maxWidth:460}}><div className="panel"><div className="brand">CEDAR LAKE CARPENTRY</div><h1>Employee sign in</h1><p>Access your end-of-day PO and VPO submissions.</p><form onSubmit={submit}><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/><label htmlFor="password">Password</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/>{error&&<div className="alert" role="alert">{error}</div>}<button className="full" disabled={loading}>{loading?'Signing in…':'Sign in'}</button></form><p className="muted">Accounts are created by the office. Contact your administrator if you need access.</p></div></main>;
}

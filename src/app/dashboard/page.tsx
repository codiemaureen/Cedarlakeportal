import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SignOut } from '@/components/sign-out';
export const dynamic='force-dynamic';
export default async function Dashboard(){
 const supabase=await createClient();const {data:{claims}}=await supabase.auth.getClaims();if(!claims)redirect('/login');
 const {data:profile}=await supabase.from('profiles').select('full_name,role,active').eq('id',claims.sub).maybeSingle();
 if(!profile?.active)return <main><div className="panel"><h1>Account not active</h1><p>Please contact the office for access.</p><SignOut/></div></main>;
 return <main><div className="topline"><div className="brand">CEDAR LAKE CARPENTRY</div><SignOut/></div><h1>End-of-Day Forms</h1><p>Welcome, {profile.full_name}. Choose what you need to complete.</p><div className="cards"><div className="card"><h2>Purchase Order</h2><p>Record materials and purchases.</p><span className="muted">Coming in Phase 2</span></div><div className="card"><h2>Vendor Purchase Order</h2><p>Record vendor or subcontractor purchases.</p><span className="muted">Coming in Phase 2</span></div><div className="card"><h2>Submission History</h2><p>Review past submissions.</p><span className="muted">Coming in Phase 2</span></div></div>{profile.role==='admin'&&<p className="muted">Administrator account · Management tools will be added in a later phase.</p>}</main>;
}

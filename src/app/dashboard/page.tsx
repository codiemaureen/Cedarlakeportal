import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SignOut } from '@/components/sign-out';
export const dynamic='force-dynamic';
export default async function Dashboard(){
 const supabase = await createClient();
 const { data: session } = await supabase.auth.getClaims();
 if (!session?.claims.sub) redirect('/login');
 const { data: profile, error } = await supabase.from('profiles').select('full_name,role,active').eq('id',session.claims.sub).maybeSingle();
 if (error) return <main><div className="panel"><h1>Unable to load your profile</h1><p>Reload the page or contact the office if the problem continues.</p><SignOut/></div></main>;
 if (!profile) return <main><div className="panel"><h1>Employee profile unavailable</h1><p>Ask the office to check that your employee profile is linked to your sign-in account.</p><SignOut/></div></main>;
 if (!profile.active) return <main><div className="panel"><h1>Account not active</h1><p>Please contact the office for access.</p><SignOut/></div></main>;
 return <main><div className="topline"><div className="brand">CEDAR LAKE CARPENTRY</div><SignOut/></div><h1>End-of-Day Forms</h1><p>Welcome, {profile.full_name}. Choose what you need to complete.</p><div className="cards"><div className="card"><h2>Purchase Order</h2><p>Record materials and purchases.</p><span className="muted">Coming in Phase 2</span></div><div className="card"><h2>Vendor Purchase Order</h2><p>Record vendor or subcontractor purchases.</p><span className="muted">Coming in Phase 2</span></div><div className="card"><h2>Submission History</h2><p>Review past submissions.</p><span className="muted">Coming in Phase 2</span></div></div>{profile.role==='admin'&&<p className="muted">Administrator account · Management tools will be added in a later phase.</p>}</main>;
}

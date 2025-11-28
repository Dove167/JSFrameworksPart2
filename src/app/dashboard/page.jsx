import { getCurrentUser } from '@/lib/simpleAuth';

export default async function DashboardPage() {
  const user = getCurrentUser();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
          <p className="mb-4">Please log in to access the dashboard.</p>
          <p className="text-sm text-gray-600 mb-4">Use the mock authentication by running this in browser console:</p>
          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
            localStorage.setItem('lab4_auth', 'true'); location.reload();
          </code>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center gap-3 p-8">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome {user.name}</p>
      <p className="text-sm text-muted-foreground">Email: {user.email}</p>
      <div className="mt-4">
        <button 
          onClick={() => {
            localStorage.removeItem('lab4_auth');
            location.reload();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </section>
  );
}

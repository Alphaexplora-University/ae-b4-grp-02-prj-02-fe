// VIEW layer
import { useLoginViewModel } from '../viewmodel/useLoginViewModel';

export default function LoginView() {
  const { form, error, onChange, onSubmit, onRegisterClick } = useLoginViewModel();

  return (
    <main className="min-h-screen bg-[#080808] text-[#f8f8f8] flex items-center justify-center p-6">
      <section className="w-full max-w-[420px] bg-[#151515] border border-[#262626] rounded-[20px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="mb-6">
          <p className="m-0 text-[#8FEA67] text-xs uppercase tracking-[0.24em]">Vendor Portal</p>
          <h1 className="mt-2 mb-1.5 text-2xl font-bold">Login</h1>
          <p className="m-0 text-[#8f8f8f]">Access your vendor dashboard.</p>
        </div>

        <div> <form onSubmit={onSubmit}>
          <label className="block mb-3">
            <span className="block mb-1.5 text-[#cfcfcf]">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => onChange('email', event.target.value)}
              className="w-full py-3 px-3.5 rounded-n-[10px] border border-[#2b2b2b] bg-[#101010] text-white focus:outline-none"
              placeholder="vendor@example.com"
            />
          </label>

          <label className="block mb-4">
            <span className="block mb-1.5 text-[#cfcfcf]">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => onChange('password', event.target.value)}
              className="w-full py-3 px-3.5 rounded-[10px] border border-[#2b2b2b] bg-[#101010] text-white focus:outline-none"
              placeholder="Password"
            />
          </label>

          {error ? <p className="text-[#ff7d7d] mb-3">{error}</p> : null}

          <button type="submit" className="w-full py-3 px-3.5 rounded-[10px] border-none bg-[#8FEA67] text-[#071208] font-bold cursor-pointer">
            Login
          </button>
        </form>
</div>
       
        <p className="mt-4 text-[#8f8f8f] text-center">
          New vendor?{' '}
          <button type="button" onClick={onRegisterClick} className="bg-transparent border-none text-[#8FEA67] cursor-pointer p-0">
            Register
          </button>
        </p>
      </section>
    </main>
  );
}
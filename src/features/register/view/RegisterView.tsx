// VIEW layer
import { useRegisterViewModel } from '../viewmodel/useRegisterViewModel';

export default function RegisterView() {
  const { form, error, onChange, onSubmit, onLoginClick } = useRegisterViewModel();

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <section style={{ width: '100%', maxWidth: 480, background: '#151515', border: '1px solid #262626', borderRadius: 20, padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ margin: 0, color: '#8FEA67', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.24em' }}>Vendor Portal</p>
          <h1 style={{ margin: '8px 0 6px', fontSize: 28 }}>Register</h1>
          <p style={{ margin: 0, color: '#8f8f8f' }}>Create your vendor account.</p>
        </div>

        <form onSubmit={onSubmit}>
          <label style={{ display: 'block', marginBottom: 10 }}>
            <span style={{ display: 'block', marginBottom: 6, color: '#cfcfcf' }}>Business Name</span>
            <input value={form.business_name} onChange={(event) => onChange('business_name', event.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2b2b2b', background: '#101010', color: '#fff' }} />
          </label>

          <label style={{ display: 'block', marginBottom: 10 }}>
            <span style={{ display: 'block', marginBottom: 6, color: '#cfcfcf' }}>Owner Name</span>
            <input value={form.owner_name} onChange={(event) => onChange('owner_name', event.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2b2b2b', background: '#101010', color: '#fff' }} />
          </label>

          <label style={{ display: 'block', marginBottom: 10 }}>
            <span style={{ display: 'block', marginBottom: 6, color: '#cfcfcf' }}>Email</span>
            <input type="email" value={form.email} onChange={(event) => onChange('email', event.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2b2b2b', background: '#101010', color: '#fff' }} />
          </label>

          <label style={{ display: 'block', marginBottom: 10 }}>
            <span style={{ display: 'block', marginBottom: 6, color: '#cfcfcf' }}>Password</span>
            <input type="password" value={form.password} onChange={(event) => onChange('password', event.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2b2b2b', background: '#101010', color: '#fff' }} />
          </label>

          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={{ display: 'block', marginBottom: 6, color: '#cfcfcf' }}>Confirm Password</span>
            <input type="password" value={form.confirm_password} onChange={(event) => onChange('confirm_password', event.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #2b2b2b', background: '#101010', color: '#fff' }} />
          </label>

          {error ? <p style={{ color: '#ff7d7d', marginBottom: 12 }}>{error}</p> : null}

          <button type="submit" style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: 'none', background: '#8FEA67', color: '#071208', fontWeight: 700, cursor: 'pointer' }}>
            Register
          </button>
        </form>

        <p style={{ marginTop: 16, color: '#8f8f8f', textAlign: 'center' }}>
          Already registered?{' '}
          <button type="button" onClick={onLoginClick} style={{ background: 'transparent', border: 'none', color: '#8FEA67', cursor: 'pointer', padding: 0 }}>
            Login
          </button>
        </p>
      </section>
    </main>
  );
}

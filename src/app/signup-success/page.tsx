export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="card-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>
            Check your email
          </h1>
          <p className="text-base mb-6" style={{ color: 'var(--text-2)' }}>
            Check your email for a confirmation link to complete your registration.
          </p>
        </div>
      </div>
    </div>
  )
}

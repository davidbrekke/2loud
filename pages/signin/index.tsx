import EmailAuth from '@components/auth/EmailAuth'
import EthereumAuth from '@components/auth/EthereumAuth'
import Layout from '@components/layout'

const SignIn = () => (
  <Layout>
    <div className="h-screen flex flex-col justify-center">
      <details>
        <summary>sign in with email</summary>
        <EmailAuth />
      </details>
      <details>
        <summary>sign in with ethereum</summary>
        <EthereumAuth />
      </details>
    </div>
  </Layout>
)

export default SignIn

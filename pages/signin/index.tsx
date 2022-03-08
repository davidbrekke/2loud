import EmailAuth from '@components/auth/EmailAuth'
import EthereumAuth from '@components/auth/EthereumAuth'
import Layout from '@components/layout'

const SignIn = () => (
  <Layout>
    <div className="h-screen flex flex-col items-center justify-center gap-6 w-80 md:w-auto">
      <h2 className="text-2xl text-gray-700">choose sign in method</h2>
      <details className="bg-white bg-opacity-10 p-4 rounded-xl shadow-lg">
        <summary className="cursor-pointer text-lg text-gray-600 text-center outline-none">
          sign in with email
        </summary>
        <EmailAuth />
      </details>
      <details className="bg-white bg-opacity-10 p-4 rounded-xl shadow-lg">
        <summary className="cursor-pointer text-lg text-gray-600 text-center outline-none">
          sign in with ethereum
        </summary>
        <EthereumAuth />
      </details>
    </div>
  </Layout>
)

export default SignIn

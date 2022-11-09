import { useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div>
        <div>
          <label htmlFor="">
            <input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Email"
            />
          </label>
          <label htmlFor="">
            <input
              type="password"
              name=""
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id=""
              placeholder="*********"
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={() => signIn('credentials', { email, password })}
          className="bg-white border-4 border-black font-bold py-1 px-2 shadow-lg "
        >
          Fazer login
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

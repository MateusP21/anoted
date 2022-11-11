import { useState } from 'react';

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
          className="bg-white border-4 border-black font-bold py-1 px-2 shadow-lg "
        >
          Fazer login
        </button>
      </div>
    </div>
  );
}

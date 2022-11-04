/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { Plus } from 'phosphor-react';
export default function Home() {
  return (
    <div className="bg-white">
      <Head>
        <title>Anoted</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header class="flex items-center bg-green-100 border-2 border-black justify-between p-2 m-4 ">
        <div class="flex gap-4">
          <img
            class="w-10 h-10 object-cover border-2 border-black"
            src="https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
          />
          <div>
            <p class="text-sm">Hello 👋</p>
            <h2 class="text-lg font-bold">Mateus!</h2>
          </div>
        </div>
        <div>
          <button
            title="Add Note"
            class="bg-yellow-400 p-1 border-2 border-black flex items-center"
          >
            <Plus size={16} color="#0f0000" weight="bold" />
          </button>
        </div>
      </header>
    </div>
  );
}

import { ArrowRight } from 'phosphor-react';
const NoteCard = ({ title, body }) => {
  return (
    <section className="hover:shadow-[6px_6px] transition-shadow bg-white h-48 flex flex-col border-4 border-black p-4 gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-2xl truncate">{title}</h1>
          <p className="text-[0.7rem] text-slate-300">
            Edited on Saturday, 12:05
          </p>
        </div>

        <ArrowRight
          size={32}
          weight="bold"
          color="#0f0000"
          className="self-start p-2"
        />
      </div>
      <p className="text-base text-slate-800 overflow-hidden">{body}</p>
    </section>
  );
};

export default NoteCard;

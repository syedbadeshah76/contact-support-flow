export function EdvanzLogo({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-sm transition-transform hover:scale-105">
        <span className="font-black italic text-white text-xs tracking-tighter">EZ</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 select-none">
      {/* EZ Icon Badge */}
      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-md">
        <span className="font-black italic text-white text-sm tracking-tighter">EZ</span>
      </div>

      {/* EDVANZ Text & Tagline */}
      <div className="flex flex-col leading-none">
        <span className="font-display text-2xl font-black italic tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          EDVANZ
        </span>
        <span className="mt-0.5 text-[10px] font-semibold italic tracking-wider text-slate-400">
          Beyond Learning.
        </span>
      </div>
    </div>
  );
}

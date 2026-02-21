import { Map, List } from "lucide-react";

export default function FloatingActionButton({
  mode,
  onClick,
}: {
  mode?: "LIST" | "MAP";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="md:hidden absolute bottom-10 right-4 z-50 flex items-center justify-center px-5 py-3.5 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-black transition-all focus:outline-none ring-offset-2 ring-gray-900 active:scale-95 border border-white/10"
      aria-label={mode === "LIST" ? "지도 보기" : "목록 보기"}
    >
      {mode === "LIST" ? (
        <Map className="w-5 h-5 mr-2" />
      ) : (
        <List className="w-5 h-5 mr-2" />
      )}
      <span className="font-black text-sm tracking-tight">
        {mode === "LIST" ? "지도 보기" : "목록 보기"}
      </span>
    </button>
  );
}

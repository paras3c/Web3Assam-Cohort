import React from "react";

export default function UserCard({ user }) {
  // Support both randomuser.me shape and a simple backend shape { id, name, email }
  const name = typeof user?.name === "string"
    ? user.name
    : user?.name
      ? `${user.name.title} ${user.name.first} ${user.name.last}`
      : "Unknown";

  const email = user?.email || "-";

  const country = user?.location?.country || user?.country || "-";

  const img = user?.picture?.large || user?.picture?.medium || null;

  const initials = (name || "").split(" ").filter(Boolean).slice(0,2).map(s => s[0]?.toUpperCase()).join("");

  return (
    <article className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center hover:shadow-lg transition">
      {img ? (
        <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover border" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">
          {initials || "U"}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-800 truncate">{name}</h3>
        <p className="text-xs text-slate-500 mt-1 truncate">{email}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-md">{country}</span>
        </div>
      </div>
    </article>
  );
}

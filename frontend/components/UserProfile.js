export default function UserProfile({ user }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl shadow p-4 mb-8 border border-gray-100">
      <img
        src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
        alt="avatar"
        className="w-14 h-14 rounded-full border-2 border-blue-200 shadow"
      />
      <div>
        <div className="font-bold text-lg text-blue-800">{user.name}</div>
        <div className="text-gray-500 text-sm">{user.email}</div>
      </div>
    </div>
  );
}

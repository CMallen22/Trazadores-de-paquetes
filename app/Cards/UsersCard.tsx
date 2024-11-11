import React, { useState } from "react";

type Props = {
  id_user: number;
  username: string;
};

const UsersCard = ({ id_user, username }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlockUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/db/blockUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_user })
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to block user');
      }

      alert('User blocked successfully');
    } catch (error) {
      console.error('Error blocking user:', error);
    }
    window.location.reload()
  };

  return (
    <div className="flex flex-row space-x-4">
      <span className="mb-3 text-2xl font-semibold text-black">{username}</span>
      <button
        onClick={handleBlockUser}
        disabled={loading}
        className="group rounded-lg border border-neutral-50 px-5 py-4 bg-amber-400 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-amber-500"
      >
        <h2 className="text-2xl font-semibold text-center">
          {loading ? 'Blocking...' : 'Bloquear'}
        </h2>
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UsersCard;

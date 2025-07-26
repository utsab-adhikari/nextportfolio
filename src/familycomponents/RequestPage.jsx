import { useSession } from 'next-auth/react';
import React from 'react';

const RequestPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 px-4 py-10">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <img
          src={session.user.image || "/avatar-placeholder.png"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-blue-500 mb-4 shadow"
        />
        <h2 className="text-2xl font-bold text-white mb-1">{session.user.name}</h2>
        <p className="text-gray-400 text-sm mb-6">{session.user.email}</p>
        <div className="w-full bg-gray-800 rounded-lg p-4 flex flex-col items-center">
          <p className="text-center text-gray-200 text-base mb-2">
            You can access albums and images only after admin accepts your request.
          </p>
          {session.user.family === "member" && (
            <div className="flex flex-col items-center mt-2">
              <span className="px-4 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold">
                Request Sent
              </span>
              <span className="mt-1 text-yellow-300 text-xs tracking-wider">
                Status: Pending
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
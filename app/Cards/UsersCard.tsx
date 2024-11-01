import React from "react";

type Props = {
    id_user: number
  username: string 

};

const UsersCard = ({ username }: Props) => {
  return (
    <div className="flex flex-row space-x-4">
  <span className="mb-3 text-2xl font-semibold text-black">{username}</span>
  <button
          onClick={() => console.log("Confirmar")}
          className="group rounded-lg border border-neutral-50 px-5 py-4 bg-amber-400 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-amber-500"
          
        >
          <h2 className={`text-2xl font-semibold text-center`}>Bloquear</h2>
        </button>
</div>
  );
};

export default UsersCard;

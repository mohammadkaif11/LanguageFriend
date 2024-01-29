
// import React from "react";
// import { getServerAuthSession } from "~/server/auth";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { signOut } from "next-auth/react";
// import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

// interface User {
//   name: string;
//   email: string;
//   image: string;
//   id: string;
// }

// interface Session {
//   user: User;
// }

//  function Profile() {
//   // const session = (await getServerAuthSession()) as Session;
//   // if (!session) {
//   //   redirect("/login");
//   // }
//   return (
//     <div className="flex items-center">
//       {/* <Link
//         href="/settings"
//         className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
//       >
//         <img
//           className="h-8 w-8 rounded-full bg-gray-800"
//           src={
//             session.user.image ??
//             `https://avatar.vercel.sh/${session.user.email}`
//           }
//           alt=""
//         />
//         <span aria-hidden="true">{session.user.name}</span>
//       </Link>
//       <span
//         onClick={() => signOut()}
//         className="rounded-lg  text-stone-700 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
//       >
//         <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white"/>
//       </span> */}
//     </div>
//   );
// }

// export default Profile;

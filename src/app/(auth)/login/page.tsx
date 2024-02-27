import LoginButton from "./LoginButton";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <div className="mx-5 border border-black bg-yellow-200 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md ">
      <h4 className="text-2xl font-bold text-yellow-500 text-center">
        <span className="text-4xl">L</span>ANGAUGE
        <span className="text-4xl">F</span>RIEND
      </h4>
      <h1 className="font-cal mt-6 text-center text-3xl text-black">
        Welcome to Language Friend!
      </h1>
      <p className="mb-8 mt-2 text-center text-sm text-black">
        Learning Language with Fun!
      </p>
      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginButton />
        </Suspense>
      </div>
    </div>
  );
}

import React from "react";

function page() {
  return (
    <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">Tom Cook</div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">tom.cook@example.com</div>
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">Language and dates</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Choose what language and date format to use throughout your account.
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">English</div>
              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Update
              </button>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date format</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">DD-MM-YYYY</div>
              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Update
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </main>

  );
}

export default page;

const CardSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
    >
      <div className="mb-4 h-48 rounded bg-gray-300 dark:bg-gray-700" />

      <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="mb-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"
        />
      ))}

      <div className="mt-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-2">
          <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-2 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CardSkeleton;

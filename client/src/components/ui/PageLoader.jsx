export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-teal-100 border-t-teal-500" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

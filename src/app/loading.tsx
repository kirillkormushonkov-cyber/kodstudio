export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center py-32">
      <div
        role="status"
        aria-label="Загрузка"
        className="border-border border-t-brand-violet size-12 animate-spin rounded-full border-2"
      />
    </main>
  );
}

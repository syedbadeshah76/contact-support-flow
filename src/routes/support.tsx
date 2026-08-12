import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/support")({
  component: SupportLayout,
});

function SupportLayout() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Outlet />
    </div>
  );
}

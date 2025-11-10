
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/clients')({
  component: ClientsLayout,
});

function ClientsLayout() {
  return <Outlet />;
}
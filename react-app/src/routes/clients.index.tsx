
import { createFileRoute } from '@tanstack/react-router';
import ClientsPage from '../clients/pages/ClientsPage';

export const Route = createFileRoute('/clients/')({
  component: ClientsPage,
});

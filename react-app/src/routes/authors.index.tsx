import { createFileRoute } from '@tanstack/react-router';
import AuthorsPage from '../authors/pages/AuthorsPage';

export const Route = createFileRoute('/authors/')({
  component: AuthorsPage,
});
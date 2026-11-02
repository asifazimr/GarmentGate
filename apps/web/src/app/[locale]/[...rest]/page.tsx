import { notFound } from 'next/navigation';

/** Any path no route matches: show the localized 404 inside the app's layout. */
export default function CatchAll() {
  notFound();
}

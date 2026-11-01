import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder home page; the real buyer/manufacturer journeys replace this.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-4 py-12 sm:px-6">
      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          GarmentGate
        </h1>
        <p className="text-muted-foreground max-w-prose text-base sm:text-lg">
          Source garments from verified manufacturers worldwide. Quotes, chat, orders and payments,
          all managed in one place.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>For buyers</CardTitle>
            <CardDescription>Request quotes and track production.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full sm:w-auto" disabled>
              Request a quote
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For manufacturers</CardTitle>
            <CardDescription>Receive qualified orders from global buyers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full sm:w-auto" variant="outline" disabled>
              Join as a manufacturer
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

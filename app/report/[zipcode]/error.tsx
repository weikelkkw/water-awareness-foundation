"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[report] error:", error);
  }, [error]);

  return (
    <Section className="bg-ocean-fade">
      <Container size="tight" className="text-center py-16">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-100 text-amber-500 mb-6">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="font-serif text-3xl text-ocean-700 mb-3">
          We hit a snag pulling EPA data.
        </h1>
        <p className="text-ink/75 leading-relaxed mb-8 max-w-md mx-auto">
          The EPA SDWIS endpoint can be slow or briefly unavailable. Wait a
          moment and try again — your data is fine, ours just couldn&apos;t
          reach the source this time.
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Link href="/">
            <Button variant="outline">Back to home</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

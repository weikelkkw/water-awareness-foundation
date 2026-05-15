import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="bg-ocean-fade">
      <Container size="tight" className="text-center py-20">
        <div className="font-serif text-7xl text-ocean-700 mb-4">404</div>
        <h1 className="display text-3xl text-ocean-700 mb-4 text-balance">
          That page doesn&apos;t exist.
        </h1>
        <p className="text-ink/75 leading-relaxed mb-8 max-w-md mx-auto">
          The page may have moved, or the link is broken. Try the homepage, or
          look up your water by ZIP.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/report">
            <Button variant="outline">Find your ZIP</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

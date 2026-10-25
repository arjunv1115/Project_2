import Seo from '@/components/seo/Seo';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="section-y">
        <Container className="max-w-2xl text-center">
          <p className="font-display text-7xl font-extrabold text-teal-500 sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page does not exist</h1>
          <p className="mt-4 text-lg leading-relaxed text-body">
            The link may be broken or the page may have moved. Head back to the home page or tell us what
            you were looking for.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/">Go to home page</Button>
            <Button to="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

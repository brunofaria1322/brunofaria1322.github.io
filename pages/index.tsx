import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Image
          isBlurred
          alt="NextUI hero Image"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          width={300}
        />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Make&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
          <br />
          <h1 className={title()}>
            websites regardless of your design experience.
          </h1>
          <h4 className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </h4>
        </div>

        <div className="flex gap-3">
          <Button
            as={Link}
            color="primary"
            href={siteConfig.links.docs}
            radius="full"
            variant="shadow"
          >
            Download CV
          </Button>
          <Button
            as={Link}
            href={siteConfig.links.github}
            radius="full"
            variant="bordered"
          >
            Contact me
          </Button>
        </div>

        <div className="mt-8">Get started by editing</div>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="education"
      >
        <h2 className="text-2xl font-bold">Education</h2>
        <p>
          Ph.D. in Informatics Engineering - Intelligent Systems - University of
          Coimbra, Portugal
        </p>
        <p>
          M.Sc. in Informatics Engineering - Intelligent Systems - University of
          Coimbra, Portugal
        </p>
        <p>
          B.Sc. in Informatics Engineering - University of Coimbra, Portugal
        </p>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="experience"
      >
        <h2 className="text-2xl font-bold">Experience</h2>
        <p>Researcher at the University of Coimbra, Portugal</p>
        <p>Software Engineer at a startup, Coimbra, Portugal</p>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="publications"
      >
        <h2 className="text-2xl font-bold">Publications</h2>
        <p>Published 5 papers in top-tier conferences and journals</p>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="projects"
      >
        <h2 className="text-2xl font-bold">Projects</h2>
        <p>Developed 10+ projects in the last 5 years</p>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="honors-awards"
      >
        <h2 className="text-2xl font-bold">Honors & Awards</h2>
        <p>Won the best paper award at a top-tier conference</p>
      </section>
    </DefaultLayout>
  );
}

import kwameImage from "../../assets/images/team/team-1.jpg";
import arabaImage from "../../assets/images/team/team-1.jpg";
import kofiImage from "../../assets/images/team/team-1.jpg";
import euniceImage from "../../assets/images/team/team-1.jpg";

const team = [
  {
    name: "Kwame Mensah",
    role: "Chief Executive Officer",
    image: kwameImage,
    description:
      "Former Lead Architect at global telecommunications firms. Over 15 years guiding Pan-African digital payment infrastructures.",
  },
  {
    name: "Dr. Araba Quaye",
    role: "Chief Technology Officer",
    image: arabaImage,
    description:
      "PhD in Distributed Computing. Directs research into fault-tolerant distributed algorithms, micro-frontends, and cloud optimization.",
  },
  {
    name: "Kofi Boateng",
    role: "VP of Product & UX",
    image: kofiImage,
    description:
      "10+ years crafting complex financial dashboards and ergonomic developer interfaces. Advocate for simple, robust design.",
  },
  {
    name: "Eunice Adjei",
    role: "Head of Cloud Infrastructure",
    image: euniceImage,
    description:
      "Certified Kubernetes Architect and multi-cloud security specialist. Oversees automated deployment, ISO audits, and regional edge meshes.",
  },
];

function TeamSection() {
  return (
    <section
      id="team"
      className="scroll-mt-[90px] bg-brand-surface px-6 py-20 md:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Heading */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-brand-primary-light px-3 py-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-primary">
                Leadership & Architects
              </span>
            </div>

            <h2 className="mt-4 text-[30px] font-bold tracking-[-0.035em] text-brand-ink md:text-[38px]">
              The Minds Behind Lider Technologies
            </h2>

            <p className="mt-2 max-w-[680px] text-[12px] leading-5 text-brand-muted">
              A disciplined coalition of enterprise architects, software
              directors, and research engineers.
            </p>
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
            The Team
          </span>
        </div>

        {/* Team cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-xl border border-brand-border bg-white"
            >
              <div className="aspect-[1/1.05] overflow-hidden bg-brand-primary-light">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="p-5">
                <h3 className="text-[14px] font-semibold text-brand-ink">
                  {member.name}
                </h3>

                <p className="mt-1 text-[10px] font-medium text-brand-primary">
                  {member.role}
                </p>

                <p className="mt-4 text-[10px] leading-5 text-brand-muted">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
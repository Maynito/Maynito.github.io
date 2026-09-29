import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

export default function ProjectCard({ title, description, imageUrl, projectUrl, techs = [] }) {
  const isInternal = projectUrl.startsWith("/") && !projectUrl.startsWith("//");
  const Wrapper = isInternal ? Link : "a";
  const linkProps = isInternal
    ? { to: projectUrl }
    : { href: projectUrl, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper {...linkProps} className="group block">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-secondary-text/20 bg-secondary-text/10 transition-transform duration-300 group-hover:scale-[0.97]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover object-top transition-opacity group-hover:opacity-80"
          />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-primary-text">{title}</h3>
          <p className="text-sm leading-snug text-secondary-text">{description}</p>
          {techs.length > 0 && (
            <p className="text-xs text-secondary-text">{techs.join(" · ")}</p>
          )}
        </div>
        <LuArrowUpRight className="mt-0.5 size-4 shrink-0 text-secondary-text group-hover:text-primary-text" />
      </div>
    </Wrapper>
  );
}

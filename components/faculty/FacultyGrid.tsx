import Image from "next/image";

export type FacultyMember = {
  id?: number;
  photoUrl?: string;
  name: string;
  designation: string;
  bio: string;
};

type FacultyGridProps = {
  members: FacultyMember[];
};

const DEFAULT_PHOTO = "/faculty/faculty.jpg";

function FacultyCard({ member }: { member: FacultyMember }) {
  const photoSrc = member.photoUrl || DEFAULT_PHOTO;
  const isExternal = photoSrc.startsWith("http");

  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-brand-blue shadow-lg">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={photoSrc}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={isExternal}
        />
      </div>
      <div className="flex flex-1 flex-col px-4 py-4 text-white">
        <h3 className="text-lg font-medium italic">{member.name}</h3>
        <p className="mt-1 text-xs leading-snug text-white/85 sm:text-sm">
          {member.designation}
        </p>
        <hr className="my-3 border-white/25" />
        <p className="text-sm leading-relaxed text-white/90">{member.bio}</p>
      </div>
    </article>
  );
}

export default function FacultyGrid({ members }: FacultyGridProps) {
  if (members.length === 0) {
    return (
      <p className="text-center text-foreground/70">
        Faculty profiles will be published soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <FacultyCard
          key={member.id ?? member.name}
          member={member}
        />
      ))}
    </div>
  );
}

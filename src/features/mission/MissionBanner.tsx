import Image from "next/image";

function MissionBanner({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title?: string;
}) {
  return (
    <div className="relative w-full md:container-2xl mx-auto h-[250px] sm:h-[300px] md:h-[500px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-center object-cover w-full h-[500px] "
      />
      {!title ? (
        <h1 className="hidden lg:block z-10 absolute bottom-8 left-8 text-2xl lg:text-5xl font-medium">
          {title}
        </h1>
      ) : null}
    </div>
  );
}
export default MissionBanner;

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
    <div className="relative w-full md:container-2xl mx-auto h-[400px] md:h-[400px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={720}
        height={400}
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

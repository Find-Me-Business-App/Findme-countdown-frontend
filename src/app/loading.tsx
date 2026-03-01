import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <Image
        src="/animate-logo.svg"
        alt="FindMe loading"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}


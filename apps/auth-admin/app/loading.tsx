import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center animate-fadeIn">
        <Image
          src={`/auth-admin/images/loader2.gif`}
          alt="Logo"
          className="rounded-full animate-bounce mx-auto"
          width={200}
          height={200}
        />
        <h1 className="text-3xl font-bold text-secondary-main mb-2 animate-slideUp">
          SPORTON
        </h1>
        <p className="text-secondary-main/80 animate-slideUp delay-200">
          {"جاري التحميل..."}
        </p>
      </div>
    </div>
  );
}

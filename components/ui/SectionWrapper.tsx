import { ReactNode } from "react";


export default function SectionWrapper({ children }: { children: ReactNode }) {
return (
<section className="min-h-screen px-6 md:px-16 py-24 flex flex-col justify-center">
{children}
</section>
);
}
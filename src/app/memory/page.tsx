import { Suspense } from "react";
import { MemoryExperience } from "./MemoryExperience";

export default function MemoryPage() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <Suspense fallback={null}>
        <MemoryExperience />
      </Suspense>
    </main>
  );
}

import { getFeed } from "@/helpers/api"

import Filters from "@/components/filters"
import Feed from "@/components/feed"

export default async function Home() {
  const data = await getFeed();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="mx-auto max-w-[780px] px-4">
          <div
            className="mx-auto mb-8 text-base sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed text-body-color">
            <Filters />
          </div>

          <Feed initialData={data} />
        </div>
      </div>
    </main>
  )
}


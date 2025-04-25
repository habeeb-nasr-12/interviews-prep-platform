export const dynamic = 'force-dynamic';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import InterviewCard from '@/components/InterviewCard';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action';

export default async function Home() {
  const user = await getCurrentUser()
  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ])

  const hasPassedInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <div>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-powered practice & feedback</h2>
          <p className="text-lg">Practice on real interview questions & get instant feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className='flex flex-col mt-8'>
        <h2 className='mb-2'> Your Interviews </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 max-lg:flex-col">
          {hasPassedInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview?.id} />
            ))
          ) : (
            <p>No Available Interviews Yet</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Explore More Interviews - Find Your Next Challenge</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-lg:flex-col">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview?.id} />
            ))
          ) : (
            <p>There Are No New Interviews !</p>
          )}
        </div>
      </section>
    </div>
  );
}

import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId } from '@/lib/actions/general.action';

const InterviewCard = async ({ userId, id, role, techstack, createdAt, type }: InterviewCardProps) => {
    const feedback =
        userId && id
            ? await getFeedbackByInterviewId({
                interviewId: id,
                userId,
            })
            : null;
    const NormalizedType = /mix/gi.test(type) ? 'mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-1 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{NormalizedType}</p>
                    </div>
                    <Image
                        src={getRandomInterviewCover()}
                        alt="robo-dude"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />
                </div>
                <h3 className="mt-2 capitalize">{role} Interview</h3>
                <div className="flex flex-row gap-5 mt-1">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/calendar.svg"
                            alt="calendar icon"
                            width={22}
                            height={22}
                        />
                        <p>{formattedDate}</p>
                    </div>
                </div>

                <div className="flex flex-row gap-2 items-center">
                    <Image src="/star.svg" width={22} height={22} alt="star" />
                    <p>{feedback?.totalScore || "---"}/100</p>
                </div>

                <p className="line-clamp-2 mt-5">
                    {feedback?.finalAssessment ||
                        "You haven't taken this interview yet. Take it now to improve your skills."}
                </p>

                <div className="flex flex-row justify-between my-1">
                    <DisplayTechIcons techStack={techstack} />
                    <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                        <Button className="btn-primary">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default InterviewCard

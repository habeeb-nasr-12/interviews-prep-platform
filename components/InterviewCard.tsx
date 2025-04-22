import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons';


const InterviewCard = ({ id, userId, interviewId, role, techstack, createdAt, type }: InterviewCardProps) => {
    const feedBack = null as feedBack | null;
    const NormalizedType = /mix/gi.test(type) ? 'mixed' : type;
    const formattedDate = dayjs(feedBack?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview ">
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
                    <Image src="/star.svg" alt="star icon" width={22} height={22} />
                    <p>{feedBack?.totalScore || "---"}/100</p>
                </div>
                <p className="line-clamp-2 mt-1">{feedBack?.finalAssessmnet || "You have not taken the interview yet. Take it to improve your skills."}</p>

                <div className="flex flex-row justify-between my-1">
                    <DisplayTechIcons techstack={techstack} />

                    <Link href={feedBack ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
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

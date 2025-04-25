import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import Logout from '@/components/Logout'




const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated)
    redirect("/sign-in")


  return (
    <div className='root-layout'>
      <nav className='flex justify-between'>
        <Link className="flex items-center gap-2" href="/">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100 line-clamp-1 ">Habeeb Prep  Platform </h2>
        </Link>
        <Logout />
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/dist/client/components/navigation"
import { Sidebar } from "@/components/layout/Sidebar"


async function dashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {userId}= await auth()
    if(!userId){
        redirect('/sign-in')
    }


    return (
        <div className="flex h-screen">
                <Sidebar/>
            {children}
        </div>
    )
}
export default dashboardLayout
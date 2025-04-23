import Agent from "@/components/Agent"
import { getCurrentUser } from "@/lib/actions/auth.action"


const page = async () => {
    const user = await getCurrentUser()
    return (
        <div>
            <h3 className="my-3">Interview Generation</h3>
            <Agent userName={user?.name as string} userId={user?.id} type="generate" />
        </div>
    )
}

export default page
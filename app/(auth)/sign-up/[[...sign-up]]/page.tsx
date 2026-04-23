import React from "react";
import { SignUp } from "@clerk/nextjs";


function SignUpPage(){


    return(
        <div className="flex items-center justify-center h-screen">
            <SignUp/>
        </div>
    )
}
export default SignUpPage;
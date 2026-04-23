import React from "react";
import { SignIn } from "@clerk/nextjs";


function SiginInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn/>
    </div>
  );
}
export default SiginInPage;
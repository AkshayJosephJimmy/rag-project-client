
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

 async function Home(){


  const {userId}= await auth() 

  if(!userId){
    redirect('/sign-in')
  }else redirect('/projects')

}
export default Home;
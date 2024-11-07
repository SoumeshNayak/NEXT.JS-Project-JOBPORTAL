import { fetchProfileAction } from '@/actions';
import { currentUser } from '@clerk/nextjs/server'
import Image from "next/image";
import { redirect } from 'next/navigation';

async function Home() {
  const user = await currentUser()
  // console.log(user);

  const profileInfo=await fetchProfileAction(user?.id)

  if(user && !profileInfo?._id){
    redirect('/onboard')
  }  
  return (
    <section>Main Content</section>
  );
}
export default Home

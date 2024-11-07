"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateAccountFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createprofileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient=createClient('https://jjmrytfqhyoosdrvsfpw.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbXJ5dGZxaHlvb3NkcnZzZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTcyMTAsImV4cCI6MjA0NjUzMzIxMH0.VxUHSXoUpq5RJDE25iMGMoiABwesLQaKRcURQlaXPHM')

function OnBoard() {
    const [currTab,setCurrTab]=useState('candidate')
    const [recruiterFormData,setRecruiterFormData]=useState(initialRecruiterFormData)
    const [candidateFormData,setCandidateFormData]=useState(initialCandidateAccountFormData)

    const currentAuthUser=useUser()
    const {user}=currentAuthUser

    const [file,setFile]=useState(null)
    

    function handleRecuiterFormValid(){
        return (recruiterFormData && recruiterFormData.name.trim() !== '' && recruiterFormData.companyName.trim()!== '' && recruiterFormData.companyRole.trim()!== '')
    }
    function handleCandidateFormValid(){
        return Object.keys(candidateFormData).every(key=> candidateFormData[key].trim() !=='')
    }
    
    async function createProfile(){
        const data= currTab=='candidate'?{
            candidateInfo: candidateFormData,
            role:'candidate',
            isPremiumUser:false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        }:{
            recuritorInfo: recruiterFormData,
            role:'recruiter',
            isPremiumUser:false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        }
        await createprofileAction(data,'/onboard')
    }

    function handleFileChange(event){
        event.preventDefault()
        setFile(event.target.files[0])
    }
    async function handleUploadPdfToSupaBase(){
        const {data,error}=await supabaseClient.storage.from('job-board').upload(`/public/${file.name}`,file,{cacheControl: "3600",upsert: false})

        console.log(data);
        if(data){
           setCandidateFormData({
            ...candidateFormData,
            resume: data.path
           }) 
        }
    }

    useEffect(()=>{
        if(file){
            handleUploadPdfToSupaBase()
        }
    },[file])

    function handleTabChange(value){
        setCurrTab(value)
    }
    return ( <div className="bg-white">
        <Tabs value={currTab} onValueChange={handleTabChange}>
            <div className="w-full">
                <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tighter text-gray-900">Welcome to OnBoarding</h1>
                    <TabsList>
                        <TabsTrigger value="candidate">Candidate</TabsTrigger>
                        <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <TabsContent value="candidate">
                  <CommonForm 
                  formControls={candidateOnboardFormControls}
                  buttonText={'OnBoard as Candidate'} 
                  formData={candidateFormData}
                  setFormData={setCandidateFormData}
                  handleFileChange={handleFileChange}
                  isBtnDisabled={!handleCandidateFormValid()}
                  action={createProfile}
                  />
            </TabsContent>
            <TabsContent value="recruiter">
               <CommonForm formControls={recruiterOnboardFormControls} 
               buttonText={'OnBoard as Recuiter'} formData={recruiterFormData} setFormData={setRecruiterFormData}
               isBtnDisabled={!handleRecuiterFormValid()}
               action={createProfile}
               />
            </TabsContent>
        </Tabs>
    </div> );
}

export default OnBoard;
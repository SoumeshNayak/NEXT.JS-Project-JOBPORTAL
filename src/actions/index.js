"use server"

import connectToDb from "@/database"
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

//Create profile action
export async function createprofileAction(formData,pathToRevalidate){
    await connectToDb();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate)
}

export async function fetchProfileAction(id){
    await connectToDb();
    const res=await Profile.findOne({userId: id});
    return JSON.parse(JSON.stringify(res))
}

// Create Job Action
export async function postNewJobAction(formData,pathToRevalidate){
    await connectToDb()
    await Job.create(formData)
    revalidatePath(pathToRevalidate)
}
//Fetch job action

// For  recruiter
export async function fetchJobForRecruiterAction(id){
    await connectToDb()
    const result = await Job.find({recruiterId:id})
    return JSON.parse(JSON.stringify(result))
}
// For Candidate
export async function fetchJobForCandidateAction(){
    await connectToDb()
    const result = await Job.find()
    return JSON.parse(JSON.stringify(result))
}

// Create Job Application
export async function createJobApplicationAction(data,pathToRevalidate){
    await connectToDb()
    await Application.create(data)
    revalidatePath(pathToRevalidate)
}

// fetch job application--Candidate
export async function fetchApplicationForCandidate(candidateId){
    await connectToDb()
    const result=await Application.find({candidateUserId:candidateId})
    return JSON.parse(JSON.stringify(result))
}

// fetch job application--rec
export async function fetchApplicationForRecruiter(recruiterId){
    await connectToDb()
    const result=await Application.find({recruiterUserId:recruiterId})
    return JSON.parse(JSON.stringify(result))
}
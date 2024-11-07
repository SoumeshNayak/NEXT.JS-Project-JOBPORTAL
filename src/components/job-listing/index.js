"use client"

import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecriuterJobCard from "../recruiter-job-cart";

function JobListing({user,profileInfo,jobList,jobApplication}) {
    // console.log(jobApplication);
    
    return <div>
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline dark:border-white justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">
                {
                    profileInfo?.role==='candidate'?
                    "Explore All Jobs":
                    "Job DashBoard"
                }
                </h1>
                <div>
                    {
                        profileInfo?.role==='candidate'?<p>Filter</p>:
                        <PostNewJob user={user} profileInfo={profileInfo}/>
                    }
                </div>
            </div>
            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    <div className="lg:col-span-4">
                        <div className="container mx-auto p-0 space-y-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                            {jobList && jobList.length > 0
                    ? jobList.map((jobItem) =>
                        profileInfo?.role === "candidate" ? (
                          <CandidateJobCard jobItem={jobItem} profileInfo={profileInfo} jobApplication={jobApplication}/>
                        ) : (
                          <RecriuterJobCard
                            jobItem={jobItem} profileInfo={profileInfo} jobApplication={jobApplication}
                          />
                        )
                      )
                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default JobListing;
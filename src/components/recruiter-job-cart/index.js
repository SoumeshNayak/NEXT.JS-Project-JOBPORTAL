'use client'

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

function RecriuterJobCard({jobItem,profileInfo,jobApplication}) {
    return <div>
        <CommonCard
        icon={<JobIcon/>}
        title={jobItem?.title}
        footerContent={
            <Button className=" dark:bg-[#fffa27]  flex h-11 items-center justify-center px-5">
                {
                    jobApplication.filter(item=>item.jobID==jobItem?._id).length
                } Applicant
            </Button>
        }
        />
    </div>
}

export default RecriuterJobCard;
'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  
import { Button } from "../ui/button";
import { useState } from "react";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { postNewJobAction } from "@/actions";


function PostNewJob({user,profileInfo}) {
    const [showJobDialog,setShowJobDialog]=useState(false)
    const [jobFormData,setJobFormData]=useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recuritorInfo?.companyName
    })

    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every(
          (control) => jobFormData[control].trim() !== ""
        );
      }
      async function createNewJob(){
        await postNewJobAction({
            ...jobFormData,
            recruiterId: user?.id,
            applicatants:[]
        },'/jobs')
        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recuritorInfo?.companyName
        })
      }

    return <div>
        <Button onClick={()=>setShowJobDialog(true)}  className="disabled:opacity-60 flex h-11 items-center justify-center px-5">Post a Job</Button>
        <Dialog open={showJobDialog} onOpenChange={()=>{setShowJobDialog(false)
            setJobFormData({...initialPostNewJobFormData,companyName: profileInfo?.recuritorInfo?.companyName})
        }}>
            <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Post New Job</DialogTitle>
                    <div className="grid gap-4 py-4">
                    <CommonForm
                buttonText={"Add"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJob}
              />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
}

export default PostNewJob;
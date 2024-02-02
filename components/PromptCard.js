"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { CldImage } from 'next-cloudinary';
import Link from "next/link";


const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.eventURL}?name=${post.eventURL}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWebsiteClick = () => {
    if (router) {
      console.log("dataString",`/event?id=${post._id}` )

      router.push(`/event?id=${post._id}`);
    }
  }


  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5' onClick={handleWebsiteClick}>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
        {post.eventFotoURL !== undefined ? (
                  <CldImage
                      src={post.eventFotoURL}
                      width="40"
                      height="40"
                      crop="fill"
                      gravity="auto"
                      radius="10"
                      effect="sepia"
                      className="img-fluid"
                      alt="My Event Ticket"
                    /> 
                ): (
                  <Image
                        src='/assets/images/ticket2.svg'
                        alt='logo'
                        width={40}
                        height={40}
                        className='object-contain'
                      />
                ) }

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
             {post.eventName}   
            </h3>
            <p className='font-inter text-sm text-gray-500'>
            Website Page
            </p>
          </div>
        </div>

        <a href={`${post.eventWebsite}`} target="_blank" rel="noopener noreferrer">
          <div className='copy_btn'>
          <Image height="32" width="32" src="https://unpkg.com/@icon/icofont/icons/web.svg" />
          </div>
        </a>
        {/* <div className='copy_btn' onClick={handleCopy}>
        <Image height="32" width="32" src="https://unpkg.com/@icon/icofont/icons/web.svg" />

          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div> */}
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.eventName}</p>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.eventDescription}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
      >
        {post.eventDate}
      </p>

      {/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}


    </div>
  );
};

export default PromptCard;



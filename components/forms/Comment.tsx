"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CommentValidation } from "@/lib/validation/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setIsSubmitting(true);
    try {
      let userIdToPass = currentUserId;
      if (typeof currentUserId === "string") {
        try {
          if (currentUserId.startsWith('"') || currentUserId.startsWith('{')) {
            userIdToPass = JSON.parse(currentUserId);
          }
        } catch (e) {
          userIdToPass = currentUserId;
        }
      }

      await addCommentToThread(
        threadId,
        values.thread,
        userIdToPass,
        pathname
      );

      form.reset();
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commentValue = form.watch("thread") || "";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel className='relative h-11 w-11 flex-shrink-0'>
                <Image
                  src={currentUserImg || "/assets/profile.svg"}
                  alt='profile Image'
                  fill
                  className='rounded-full object-cover ring-2 ring-white/10'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  placeholder='Write a reply...'
                  className='no-focus border-none bg-transparent text-sm-regular text-light-1 placeholder:text-light-4 outline-none'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting || commentValue.trim().length === 0}
          className='comment-form_btn'
        >
          {isSubmitting ? (
            <div className='flex items-center gap-1.5'>
              <div className='h-3.5 w-3.5 animate-spin rounded-full border-2 border-light-1 border-t-transparent' />
              <span>Replying...</span>
            </div>
          ) : (
            "Reply"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
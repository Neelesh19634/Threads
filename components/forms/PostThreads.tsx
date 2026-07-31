"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validation/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsSubmitting(true);
    try {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });

      router.push("/");
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentLength = form.watch("thread")?.length || 0;

  return (
    <Form {...form}>
      <form
        className='mt-8 flex flex-col justify-start gap-8'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <div className='flex items-center justify-between'>
                <FormLabel className='text-base-semibold text-[var(--text-primary)]'>
                  Thread Content
                </FormLabel>
                <span className='text-subtle-medium text-[var(--text-muted)]'>
                  {currentLength} / 1000
                </span>
              </div>
              <FormControl className='rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 text-[var(--text-primary)] shadow-inner backdrop-blur-md transition-all focus-within:border-primary-500'>
                <Textarea
                  rows={10}
                  placeholder='What is on your mind?...'
                  className='no-focus border-none bg-transparent text-base-regular text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-rose-400 text-xs' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={isSubmitting || currentLength === 0}
          className='w-full rounded-xl bg-primary-500 py-3 text-body-semibold text-light-1 shadow-lg shadow-indigo-500/20 transition hover:opacity-90 active:scale-[0.99] disabled:opacity-50 sm:w-fit sm:px-8'
        >
          {isSubmitting ? (
            <div className='flex items-center gap-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-light-1 border-t-transparent' />
              <span>Posting...</span>
            </div>
          ) : (
            "Post Thread"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
"use client";

import * as z from "zod";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Image as ImageIcon, X, Sparkles, Wand2, RefreshCw, AlertCircle } from "lucide-react";

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
import { uploadToCloudinary } from "@/lib/actions/upload.action";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Gemini AI State
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
      image: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleAiAction = async (action: "generate" | "improve" | "concise" | "expand") => {
    const currentThreadText = form.getValues("thread") || "";
    if (action === "generate" && !aiTopic.trim()) {
      setAiError("Enter a topic or idea for AI to write about.");
      return;
    }
    if ((action === "improve" || action === "concise" || action === "expand") && !currentThreadText.trim()) {
      setAiError("Write some text in the box first so AI can work on it!");
      return;
    }

    setIsGenerating(true);
    setAiError(null);
    setAiStatusMessage("Generating content ...");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiTopic,
          draft: currentThreadText,
          action,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiError(data.error || "Failed to generate text.");
        return;
      }

      if (data.text) {
        form.setValue("thread", data.text, { shouldValidate: true });
        setAiError(null);
        setShowAiPanel(false);
        setAiTopic("");
      } else {
        setAiError("unable to generate text. Please try again.");
      }
    } catch (err: any) {
      console.error(" Error:", err);
      setAiError("AI generation is temporarily unavailable. Please try again later.");
    } finally {
      setIsGenerating(false);
      setAiStatusMessage(null);
    }
  };

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    setIsSubmitting(true);
    try {
      let uploadedImageUrl: string | undefined = undefined;
      if (imagePreview) {
        uploadedImageUrl = await uploadToCloudinary(imagePreview);
      }

      await createThread({
        text: values.thread,
        image: uploadedImageUrl,
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
  const currentText = form.watch("thread") || "";

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
                <FormLabel className='text-base-semibold text-[var(--text-primary)] flex items-center gap-2'>
                  Thread Content
                </FormLabel>
                <span className='text-subtle-medium text-[var(--text-muted)]'>
                  {currentLength} / 1000
                </span>
              </div>

              {/* Textarea container with embedded AI assistance tag at bottom right */}
              <FormControl className='relative flex flex-col justify-between min-h-[240px] rounded-2xl border border-[var(--glass-border)] bg-[var(--card-bg)] p-4 text-[var(--text-primary)] shadow-[var(--glass-shadow)] backdrop-blur-xl transition-all duration-300 hover:border-primary-500/30 focus-within:border-primary-500 focus-within:shadow-[0_0_25px_rgba(135,126,255,0.25)]'>
                <div className='w-full h-full flex flex-col'>
                  <Textarea
                    rows={8}
                    placeholder='What is on your mind?...'
                    className='no-focus border-none !bg-transparent dark:!bg-transparent text-base-regular text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none shadow-none outline-none focus:outline-none focus:ring-0 flex-1 pb-14'
                    {...field}
                  />

                  {/* Tag and AI Prompt Bar inside bottom of textarea */}
                  <div className='absolute bottom-3 left-3 right-3 z-10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5'>
                    {showAiPanel ? (
                      <div className='flex flex-1 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-2 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200'>
                        <input
                          type='text'
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                          placeholder='Describe what you want AI to write...'
                          className='flex-1 min-w-[180px] bg-transparent px-3 py-1.5 text-xs-regular sm:text-sm-regular text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none'
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAiAction("generate");
                            }
                          }}
                        />

                        <div className='flex items-center gap-1.5 flex-shrink-0'>
                          <button
                            type='button'
                            onClick={() => handleAiAction("generate")}
                            disabled={isGenerating}
                            className='flex items-center gap-1.5 rounded-lg bg-primary-500 px-3.5 py-1.5 text-xs-semibold text-light-1 shadow-md transition hover:opacity-90 active:scale-95 disabled:opacity-50'
                            title='Generate post from topic'
                          >
                            {isGenerating ? (
                              <RefreshCw className='h-3.5 w-3.5 animate-spin' />
                            ) : (
                              <Wand2 className='h-3.5 w-3.5' />
                            )}
                            <span>Write</span>
                          </button>

                          {currentText.trim().length > 0 && (
                            <button
                              type='button'
                              onClick={() => handleAiAction("improve")}
                              disabled={isGenerating}
                              className='flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-black/5 dark:bg-white/10 px-3 py-1.5 text-xs-semibold text-[var(--text-primary)] transition hover:bg-black/10 dark:hover:bg-white/20 disabled:opacity-50'
                              title='Polish current draft'
                            >
                              <Sparkles className='h-3.5 w-3.5 text-amber-400' />
                              <span>Polish</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className='ml-auto'>
                        <button
                          type='button'
                          onClick={() => setShowAiPanel(true)}
                          className='flex items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-3.5 py-1.5 text-xs-semibold text-primary-500 shadow-sm backdrop-blur-md transition hover:bg-primary-500/20 active:scale-95'
                          title='Use AI Assistant (Gemini AI)'
                        >
                          <Sparkles className='h-3.5 w-3.5 text-amber-400' />
                          <span>Use Assistance</span>
                        </button>
                      </div>
                    )}

                    {showAiPanel && (
                      <button
                        type='button'
                        onClick={() => setShowAiPanel(false)}
                        className='flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-1.5 text-xs-semibold text-[var(--text-primary)] transition hover:bg-black/5 dark:hover:bg-white/10 flex-shrink-0'
                        title='Close AI bar'
                      >
                        <X className='h-3.5 w-3.5' />
                        <span>Close</span>
                      </button>
                    )}
                  </div>
                </div>
              </FormControl>

              {/* AI Status & Progress Message */}
              {isGenerating && aiStatusMessage && (
                <div className='mt-2 flex items-center gap-2 rounded-xl border border-primary-500/30 bg-primary-500/10 p-3 text-xs-semibold text-primary-400 animate-pulse'>
                  <RefreshCw className='h-3.5 w-3.5 animate-spin flex-shrink-0' />
                  <span>{aiStatusMessage}</span>
                </div>
              )}

              {/* Error Alert */}
              {aiError && (
                <div className='mt-2 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs-semibold text-rose-300'>
                  <AlertCircle className='h-4 w-4 flex-shrink-0 mt-0.5' />
                  <span>{aiError}</span>
                </div>
              )}

              <FormMessage className='text-rose-400 text-xs' />
            </FormItem>
          )}
        />

        {/* Image upload section */}
        <div className='flex flex-col gap-3'>
          <label className='text-base-semibold text-[var(--text-primary)]'>
            Attach Image (Optional)
          </label>
          {imagePreview ? (
            <div className='relative w-full max-w-md h-64 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-md'>
              <Image
                src={imagePreview}
                alt='thread attachment preview'
                fill
                className='object-cover'
              />
              <button
                type='button'
                onClick={removeImage}
                className='absolute top-3 right-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/90 focus:outline-none'
                title='Remove image'
              >
                <X className='h-5 w-5' />
              </button>
            </div>
          ) : (
            <label className='flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--glass-border)] bg-[var(--card-bg)] p-6 text-[var(--text-muted)] backdrop-blur-xl shadow-[var(--glass-shadow)] transition-all duration-200 hover:border-primary-500 hover:text-[var(--text-primary)] hover:shadow-lg'>
              <ImageIcon className='h-6 w-6 text-primary-500' />
              <span className='text-sm-semibold'>Click to upload an image</span>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <Button
          type='submit'
          disabled={isSubmitting || currentLength === 0}
          className='w-full rounded-2xl bg-primary-500/90 backdrop-blur-md py-3 text-body-semibold text-light-1 shadow-lg shadow-primary-500/25 transition-all duration-200 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.99] disabled:opacity-50 sm:w-fit sm:px-8'
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
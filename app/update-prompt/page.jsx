"use client";

import React, { useState, useEffect } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tag: "",
    prompt: "",
  });

  useEffect(() => {
    const getPromptsDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptsDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) alert("PromptID not found");

    const fakeUser = JSON.parse(sessionStorage.getItem("fakeUser"));
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;

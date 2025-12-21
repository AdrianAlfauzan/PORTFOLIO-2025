"use client";

import { useState, useCallback } from "react";
// OUR HOOKS
import { useToast } from "@/hooks/useToast";

// OUR UTILS
import { getUserIp } from "@/utils/ip";

// OUR LIBRARIES
import { supabase } from "@/lib/supabase";

interface FormDataType {
  name: string;
  email: string;
  message: string;
  profession: string;
  website: string;
}

export const useCommentForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
    profession: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      message: "",
      profession: "",
      website: "",
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        let userToken = localStorage.getItem("user_token");
        if (!userToken) {
          userToken = crypto.randomUUID();
          localStorage.setItem("user_token", userToken);
        }

        const { error: submitError } = await supabase
          .from("guestbook")
          .insert([
            {
              ...formData,
              status: "pending",
              is_featured: false,
              reactions: { like: 0, love: 0, thanks: 0, insightful: 0, dislike: 0 },
              user_token: userToken,
              ip_address: await getUserIp(),
            },
          ])
          .select()
          .single();

        if (submitError) throw submitError;

        success("Success!", "Thank you for your comment! It will be reviewed soon.");
        resetForm();
        onSuccess?.();
      } catch (err) {
        console.error("Error submitting comment:", err);
        error("Error", "Submission failed. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSuccess, resetForm, success, error]
  );

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
  };
};

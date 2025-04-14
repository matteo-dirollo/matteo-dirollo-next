"use client";
import React from "react";
import { Button } from "@heroui/react"; // Import HeroUI Button
import { MdFacebook } from "react-icons/md";
import { AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";
import { BsMastodon } from "react-icons/bs";
import { usePathname } from "next/navigation";
import ModalWindow from "../modals/ModalWindow";
import ReadOnlyInputWithCopyButton from "../inputs/ReadOnlyInputWithCopyButton";

const ShareOnSocials = () => {
  const slug = usePathname();
  const copyURL = `https://matteo-dirollo.com${slug}`;

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, "_blank");
  };

  const handleMastodonShare = () => {
    const url = `https://share.naturalnews.com/link/${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, "_blank");
  };

  return (
    <ModalWindow>
      <div className="mt-20 mb-5">
        <ReadOnlyInputWithCopyButton value={copyURL} />
      </div>
      <div className="flex gap-4">
        {/* Facebook Share Button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-teal-500 hover:text-teal-600 p-2"
          aria-label="facebook"
          onPress={handleFacebookShare}
        >
          <MdFacebook size="20" />
        </Button>

        {/* Twitter Share Button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-teal-500 hover:text-teal-600 p-2"
          aria-label="twitter"
          onPress={handleTwitterShare}
        >
          <AiFillTwitterCircle size="20" />
        </Button>

        {/* Mastodon Share Button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-teal-500 hover:text-teal-600 p-2"
          aria-label="mastodon"
          onPress={handleMastodonShare}
        >
          <BsMastodon size="20" />
        </Button>

        {/* LinkedIn Share Button */}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-teal-500 hover:text-teal-600 p-2"
          aria-label="linkedin"
          onPress={handleLinkedInShare}
        >
          <AiFillLinkedin size="20" />
        </Button>
      </div>
    </ModalWindow>
  );
};

export default ShareOnSocials;

"use client";
import React from "react";
import * as Yup from "yup";
import { db } from "../../../api/firebase-config.js";
import { setDoc, doc } from "@firebase/firestore";
import { BiMailSend } from "react-icons/bi";
import { Form, Formik } from "formik";
import Link from "next/link";
import { FaMastodon } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { Timestamp } from "firebase/firestore";
import MyTextInput from "../../ui/inputs/MyTextInput";
import BuyMeCoffee from "../../ui/buttons/BuyMeCoffee";
import EmmeLogo from "../../../../public/EmmeLogo";
import Expire from "../../ui/utils/Expire";
import { addToast, Button } from "@heroui/react";

const FooterNewsletter = () => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(3, "Too short!")
      .required("Required")
      .email("Invalid email"),
  });

  const collectData = async (values) => {
    const docId = values.email;
    const newsletter = doc(db, "Newsletter", docId);
    await setDoc(newsletter, {
      email: values.email,
      time: Timestamp.now(),
    });
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      await collectData(values);
      resetForm();
      addToast({
        title: "Thank you for registering!",
        description: "You will receive an email soon.",
        color: "success",
      });
    } catch (error) {
      setErrors({ db: "Already registered" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 p-10">
      <div className="container mx-auto max-w-6xl py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div>
              <EmmeLogo width={30} color={"gray-700 dark:text-white"} />
            </div>
            <p className="text-sm">© 2022 All rights reserved</p>
            <div className="flex space-x-6">
              <Button
                isOnlyIcon
                variant='ghost'
                aria-label="github"
                className="text-black dark:text-white hover:text-blackAlpha-300 dark:hover:text-blackAlpha-200 rounded-full"
              >
                <BsGithub size="28px" />
              </Button>
              <a
                rel="me"
                href="https://masto.ai/@matteodirollo"
                target="_blank"
              >
                <Button
                  isOnlyIcon
                  variant='ghost'
                  aria-label="Mastodon"
                  className="text-black dark:text-white hover:text-blackAlpha-300 dark:hover:text-blackAlpha-200 rounded-full"
                >
                  <FaMastodon size="28px" />
                </Button>
              </a>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href={"#"} className="text-sm">
              Projects
            </Link>
            <Link href={"#"} className="text-sm">
              Contact
            </Link>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/terms-and-conditions" className="text-sm">
              Terms of Service
            </Link>
            <Link href={"#"} className="text-sm">
              Legal
            </Link>
            <Link href="/privacy-policy" className="text-sm">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <p>Get some news</p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <div className="flex flex-row gap-3 items-center">
                    <MyTextInput
                      name="email"
                      className="bg-blackAlpha-100 dark:bg-whiteAlpha-100 border-0 focus:bg-whiteAlpha-300"
                    />
                    <Button
                      type="submit"
                      disabled={!isValid || !dirty || isSubmitting}
                      className={`bg-black text-white hover:bg-blackAlpha-300 dark:hover:bg-blackAlpha-400 p-2 rounded-md ${
                        !isValid || !dirty || isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <BiMailSend size="20px" />
                      )}
                    </Button>
                  </div>
                  {errors.db && (
                    <Expire delay="3000">
                      <p className="text-red-300 text-sm">{errors.db}</p>
                    </Expire>
                  )}
                </Form>
              )}
            </Formik>
            <BuyMeCoffee />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterNewsletter;

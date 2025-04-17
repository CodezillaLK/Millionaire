import { App, Form, Input, Modal } from "antd";
import { InputOTP } from "antd-input-otp";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import {
  getGPpaymentURL,
  sendAppLinkOTP,
  sendOTP,
  verifyAppLinkOTP,
  verifyOTP,
} from "../../services/bdService";
import { FaTimes } from "react-icons/fa";
import { useQuiz } from "../../contexts/quizContext";
import QuizFooter from "../card/footer";

function Subscribe() {
  const navigate = useNavigate();
  const [mobileForm] = Form.useForm();
  const { message } = App.useApp();
  const { showLoader, hideLoader } = useQuiz();

  const [currentComponent, setCurrentComponent] = useState("SUBSCRIBE"); //SUBSCRIBE, OTP
  const [numType, setNumType] = useState(null);
  const [otp, setOtp] = useState([""]);
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [referenceNo, setReferenceNo] = useState(null);

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    content: "",
  });

  const showOTP = () => {
    setCurrentComponent("OTP");
  };

  const hideOTP = () => {
    setCurrentComponent("SUBSCRIBE");
    setOtp([""]);
    setIsValidOTP(false);
    setReferenceNo(null);
    setNumType(null);
  };

  // 016 and 018
  const onRobiNumberInput = async (mobile) => {
    showLoader();
    sendOTP({ mobile: mobile })
      .then((res) => {
        if (res.data.statusCode === "S1000") {
          // console.log(res.data);
          setReferenceNo(res.data.referenceNo);
          showOTP();
        } else if (res.data.statusCode === "E1351") {
          // already subscribed
          message.info("user already subscribed!");
          // navigate with search params
          navigate({
            pathname: "/game/",
            search: createSearchParams({
              subscriptionStatus: "S1000",
            }).toString(),
          });
        } else {
          setErrorModal({
            isOpen: true,
            content: res.data.statusDetail || "Error",
          });
          throw new Error(res.data.statusDetail);
        }
      })
      .catch((error) => {
        setErrorModal({ isOpen: true, content: error.message || "Error" });
        // console.log(error);
        throw new Error(error);
      })
      .finally(() => {
        hideLoader();
      });
  };

  // 013 and 017
  const onGrameenPhoneInput = async (mobile) => {
    showLoader();
    getGPpaymentURL({ mobile })
      .then((res) => {
        // console.log(res.data);
        window.location.href = res.data.paymentURL;
      })
      .catch((e) => {
        setErrorModal({ isOpen: true, content: e.message || "Error" });
        // console.log(error);
        throw new Error(e);
      })
      .finally(() => {
        hideLoader();
      });
  };

  // 014 and 019
  const onBanglaLinkInput = async (mobile) => {
    showLoader();
    sendAppLinkOTP({ mobile: mobile })
      .then((res) => {
        if (res.data.statusCode === "S1000") {
          setReferenceNo(res.data.referenceNo);
          showOTP();
        } else if (res.data.statusCode === "E1351") {
          // already subscribed
          message.info("user already subscribed!");
          // navigate with search params
          navigate({
            pathname: "/game/",
            search: createSearchParams({
              subscriptionStatus: "S1000",
            }).toString(),
          });
        } else {
          setErrorModal({
            isOpen: true,
            content: res.data.statusDetail || "Error",
          });
          throw new Error(res.data.statusDetail);
        }
      })
      .catch((error) => {
        setErrorModal({ isOpen: true, content: error.message || "Error" });
        // console.log(error);
        throw new Error(error);
      })
      .finally(() => {
        hideLoader();
      });
  };

  const mobileNumberType = (mobile) => {
    if (mobile.startsWith("013") || mobile.startsWith("017")) {
      return "GP";
    } else if (mobile.startsWith("016") || mobile.startsWith("018")) {
      return "ROBI";
    } else if (mobile.startsWith("014") || mobile.startsWith("019")) {
      return "BANGLALINK";
    } else {
      return "";
    }
  };

  const onMobileFormFinish = async (values) => {
    // console.log(values);
    const numberType = mobileNumberType(values.mobile);
    setNumType(numberType);

    switch (numberType) {
      case "ROBI":
        onRobiNumberInput(values.mobile);
        break;
      case "GP":
        onGrameenPhoneInput(values.mobile);
        break;
      case "BANGLALINK":
        onBanglaLinkInput(values.mobile);
        break;
      default:
        setErrorModal({
          isOpen: true,
          content:
            "This service is currently only applicable for Robi, Banglalink and Grameenphone customers",
        });
    }
  };

  const validateOTP = (values, numType) => {
    const hasEmptyValues = values.some((v) => v === "");

    switch (numType) {
      case "ROBI":
        if (values.length === 6 && !hasEmptyValues) {
          setIsValidOTP(true);
        } else {
          setIsValidOTP(false);
        }
        break;
      case "BANGLALINK":
        if (values.length === 5 && !hasEmptyValues) {
          setIsValidOTP(true);
        } else {
          setIsValidOTP(false);
        }
        break;
      default:
        if (!hasEmptyValues) {
          setIsValidOTP(true);
        } else {
          setIsValidOTP(false);
        }
        break;
    }
  };

  const onRobiOTPSubmit = async (payload) => {
    try {
      showLoader();
      const res = await verifyOTP(payload);

      if (res.data.statusCode === "S1000") {
        message.success("subscription successful");
        // navigate with search params
        navigate({
          pathname: "/game/",
          search: createSearchParams({
            subscriptionStatus: "S1000",
          }).toString(),
        });
      } else {
        setErrorModal({
          isOpen: true,
          content: res.data.statusDetail || "Error",
        });
        throw new Error(res.data.statusDetail);
      }
    } catch (error) {
      setErrorModal({
        isOpen: true,
        content: error.message || "Error",
      });
      throw Error(error.message);
    } finally {
      hideLoader();
    }
  };

  const onApplinkOTPSubmit = async (payload) => {
    try {
      showLoader();
      const res = await verifyAppLinkOTP(payload);

      if (res.data?.statusCode === "S1000") {
        message.success("subscription successful");
        // navigate with search params
        navigate({
          pathname: "/game/",
          search: createSearchParams({
            subscriptionStatus: "S1000",
          }).toString(),
        });
      } else {
        setErrorModal({
          isOpen: true,
          content: res.data.statusDetail || "Error",
        });
        throw new Error(res.data.statusDetail);
      }
    } catch (error) {
      setErrorModal({
        isOpen: true,
        content: error.message || "Error",
      });
      throw Error(error.message);
    } finally {
      hideLoader();
    }
  };

  const onSubmitOTP = async () => {
    const payload = {
      referenceNo: referenceNo,
      otp: otp.join(""),
    };

    if (numType === "ROBI") {
      await onRobiOTPSubmit(payload);
    } else if (numType === "BANGLALINK") {
      await onApplinkOTPSubmit(payload);
    }
  };

  return (
    <>
      {currentComponent === "SUBSCRIBE" && (
        <div className="box flex w-full flex-col gap-10 pb-[40dvh] xl:pb-[300px] sm:w-[400px]">
          <div className="box-overlay"></div>
          <div className="mx-auto">
            <img
              className="size-[200px]"
              src="imgs/millionaire-logo.png"
              alt="millionaire logo"
            />
          </div>
          {/* <p className="text-center text-xl">
          ඔබගේ පිළිතුරු නිවැරදි. ජංගම දුරකථනය ලබා ගැනීමට ඉතිරි ප්‍රශ්න ඔබගේ
          දුරකථනයට ලබා ගන්න.
        </p> */}
          {/* heading */}
          <div className="space-y-1">
            <p className="text-center text-3xl text-[2rem] font-semibold uppercase">
              {"কোটি টাকার প্রশ্ন খেলা এবং উত্তর দাও, টাকা নাও"}
            </p>
          </div>

          <Form
            className="flex flex-col gap-4"
            form={mobileForm}
            onFinish={onMobileFormFinish}
          >
            <p className="text-center font-semibold uppercase text-white">
              {"আপনার মোবাইল নম্বর লিখুন।"}
              {/* Enter your phone no */}
            </p>
            <FormItem
              style={{
                marginBottom: 0,
              }}
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Mobile number is required!",
                  // message: "Mobile number is required!",
                },
                {
                  pattern: /01[0-9]{9}/g,
                  message: "Valid number is required! (01XX XXXXXXX)",
                },
              ]}
            >
              <Input size="large" placeholder="01XX XXXXXXX" />
            </FormItem>
            {/* <button className="button">ok!</button> */}
            <button className="button">Subscribe</button>
          </Form>

          {/* absolute inset-x-0 -bottom-12 */}
          <QuizFooter />
        </div>
      )}

      {currentComponent === "OTP" && (
        <div className="box flex min-h-dvh w-full flex-col justify-center sm:min-h-[600px] sm:w-[400px]">
          <div className="box-overlay"></div>
          <div className="mx-auto mb-20">
            <img
              className="size-[200px]"
              src="imgs/millionaire-logo.png"
              alt="millionaire logo"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <p className="text-2xl font-bold">
              {
                "অনুগ্রহ করে আপনার মোবাইল নম্বরে পাঠানো ওটিপি কোডটি প্রবেশ করুন।"
              }
              {/* OTP Verification */}
            </p>
            <InputOTP
              inputClassName="rounded-xl max-w-[none]"
              value={otp}
              onChange={(values) => {
                setOtp(values);
                validateOTP(values, numType);
              }}
              inputType="numeric"
              length={numType === "ROBI" ? 6 : 5}
            />
            {/* Submit */}
            <button
              className="button w-3/4"
              disabled={!isValidOTP}
              onClick={onSubmitOTP}
            >
              Submit
            </button>
            <p className="font-light">
              {"এখনও ওটিপি নম্বর পাননি?"}{" "}
              <span
                className="cursor-pointer font-semibold underline"
                onClick={hideOTP}
              >
                Resend OTP
              </span>
            </p>
          </div>
        </div>
      )}
      {/* error modal */}
      <Modal
        title={null}
        open={errorModal.isOpen}
        footer={null}
        closable={false}
      >
        <div className="my-12 flex flex-col items-center gap-6">
          <div className="rounded-full border-4 border-red-500 p-4">
            <FaTimes size={36} className="text-red-500" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-semibold">Error!</h3>
            <p>{errorModal.content}</p>
          </div>
          {/* ok */}
          <button
            className="button w-1/2"
            onClick={() => setErrorModal({ isOpen: false, content: "" })}
          >
            OK!
          </button>
        </div>
      </Modal>
    </>
  );
}
export default Subscribe;

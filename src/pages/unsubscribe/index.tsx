import { Form, Input, message, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  gpUnsubUser,
  unsubscribeAppLink,
  unsubscribeRobi,
} from "../../services/bdService";
import { useQuiz } from "../../contexts/quizContext";

function Unsubscribe() {
  const [unsubForm] = Form.useForm();
  const { showLoader, hideLoader } = useQuiz();

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    content: "",
  });

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

  // 013 and 017
  const onGPUnsubscribe = async (mobile) => {
    showLoader();
    gpUnsubUser({ mobile })
      .then((res) => {
        if (res.data.statusCode === "S1000") {
          message.success("You have unsubscribed successfully!");
        } else {
          setErrorModal({
            isOpen: true,
            content: res.data.statusDetail,
          });
        }
      })
      .catch((e) => {
        // console.log(e);
        setErrorModal({
          isOpen: true,
          content:
            e.response.data.message || e.response.data.statusDetail || "Error",
        });
        throw new Error(e);
      })
      .finally(() => {
        hideLoader();
      });
  };

  const onRUBIUnsubscribe = async (mobile) => {
    showLoader();
    unsubscribeRobi({ mobile })
      .then((res) => {
        if (res.data.statusCode === "S1000") {
          message.success("You have unsubscribed successfully!");
        } else {
          setErrorModal({
            isOpen: true,
            content: res.data.statusDetail,
          });
        }
      })
      .catch((e) => {
        // console.log(e);
        setErrorModal({
          isOpen: true,
          content:
            e.response.data.message || e.response.data.statusDetail || "Error",
        });
        throw new Error(e);
      })
      .finally(() => {
        hideLoader();
      });
  };

  const onALUnsubscribe = async (mobile) => {
    showLoader();
    unsubscribeAppLink({ mobile })
      .then((res) => {
        if (res.data.statusCode === "S1000") {
          message.success("You have unsubscribed successfully!");
        } else {
          setErrorModal({
            isOpen: true,
            content: res.data.statusDetail,
          });
        }
      })
      .catch((e) => {
        // console.log(e);
        setErrorModal({
          isOpen: true,
          content:
            e.response.data.message || e.response.data.statusDetail || "Error",
        });
        throw new Error(e);
      })
      .finally(() => {
        hideLoader();
      });
  };

  const onFormFinish = (values) => {
    const { mobile } = values;
    const numType = mobileNumberType(values.mobile);

    switch (numType) {
      case "GP":
        onGPUnsubscribe(mobile);
        break;
      case "ROBI":
        onRUBIUnsubscribe(mobile);
        break;
      case "BANGLALINK":
        onALUnsubscribe(mobile);
        break;
      default:
        setErrorModal({
          isOpen: true,
          content:
            "This service is currently only applicable for Grameenphone, Robi and Banglalink customers",
        });
    }
  };

  return (
    <>
      <div className="box flex flex-col gap-4 md:w-[400px]">
        {/* <p className="text-center text-xl">Enter your mobile number</p> */}
        <p className="text-center text-xl">আপনার মোবাইল নম্বর লিখুন।</p>
        <Form
          className="flex flex-col gap-4"
          form={unsubForm}
          onFinish={onFormFinish}
        >
          <FormItem
            name="mobile"
            rules={[
              {
                required: true,
                message: "মোবাইল নম্বর প্রয়োজন!",
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
          {/* <button className="button">Unsubscribe</button> */}
          <button className="button">আনসাবস্ক্রাইব</button>
        </Form>
      </div>
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
            <h3 className="text-2xl font-semibold">ত্রুটি</h3>
            <p>{errorModal.content}</p>
          </div>
          {/* ok */}
          <button
            className="button w-1/2"
            onClick={() => setErrorModal({ isOpen: false, content: "" })}
          >
            ঠিক আছে
          </button>
        </div>
      </Modal>
    </>
  );
}
export default Unsubscribe;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { FiMessageSquare, FiX } from "react-icons/fi"; // Import chat and close icons

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const apiKey = "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";

  const sendMessage = async (values, { resetForm }) => {
    const userInput = values.message;

    // Display a loading notification
    const loadingToastId = toast.info("Generating response...", {
      autoClose: false, // Do not automatically close the notification
    });

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botResponse = response.data.choices[0].message.content;

      // Hide the loading notification
      toast.dismiss(loadingToastId);

      // Display ChatGPT's response and user input using toast
      toast.success(`Success`);

      setChatHistory([
        ...chatHistory,
        { text: userInput, sender: "user" },
        { text: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    // Clear the input field
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="flex h-fit w-screen bg-gradient-to-br from-blue-400 to-green-400">
      {/* Chatbot Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
      >
        {isChatOpen ? (
          <FiX className="h-6 w-6" /> // Use the close icon
        ) : (
          <FiMessageSquare className="h-6 w-6" /> // Use the chat icon
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed right-0 bottom-10 w-1/3 h-1/3 bg-white p-4 rounded-lg shadow-lg">
          {/* Close button */}
          <button
            onClick={closeChat}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <FiX className="h-6 w-6" />
          </button>
          <h1 className="text-2xl text-center font-bold mb-4 text-blue-600">ChatBot</h1>
          <div className="chat-box h-3/4 overflow-y-auto bg-white p-4 rounded-lg">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? "text-blue-500 mb-2"
                    : "text-green-500 mb-2"
                }
              >
                {message.text}
              </div>
            ))}
          </div>
          <Formik
            initialValues={{ message: "" }}
            validationSchema={validationSchema}
            onSubmit={sendMessage}
          >
            <Form className="mt-4 flex">
              <Field
                type="text"
                name="message"
                placeholder="Type a message..."
                className="border border-gray-300 p-2 w-full rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </Form>
          </Formik>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Chat;

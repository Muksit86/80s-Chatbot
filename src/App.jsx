import { useState } from "react";
import main from "./api/Api";


function App() {
  const [UserInput, setUserInput] = useState("")
  const [messages, setMessages] = useState([
    { sender: "Bot", message: "Hello, I am Eliza" }
  ])
  const [isWaiting, setIsWaiting] = useState(false)

  const handleResponse = async (e) => {
    // First We check if the user enter enter, if the user's msg is not empty and is the flag isWaiting false, if those 3 are correct then ->
    if (e.key == "Enter" && UserInput.trim() !== "" && !isWaiting) {

      // create a new object for the messages array with user's messages then ->
      const newMessage = { sender: "user", message: UserInput };

      // new add the object in the messages array then ->
      setMessages((prev) => [...prev, newMessage])

      // imiieatly we add one more object called waiting with isWaiting = True (later use)
      setMessages((prev) => [
        ...prev,
        { sender: "bot", message: "⏳ Waiting...", isWaiting: true },
      ]);

      //Then make the isWaiting true to lock the user input
      setIsWaiting(true)
      // collect the input before erasing it
      const currentInput = UserInput;
      //erasing the user input
      setUserInput("")


      // Fake bot response after a short delay. In the response we loop over all the object if their isWaiting is true that means its time to change the message to whatever bot responed thier isWaiting false meaning that bot response is already diplayed not it's get's untouched
      try {
        const response = await main(UserInput)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.isWaiting
              ? { sender: "bot", message: response }
              : msg
          )
        );
      } catch (error) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.isWaiting
              ? { sender: "bot", message: "⚠️ Error getting response." }
              : msg
          )
        );
      } finally {
        setIsWaiting(false);
      }
    }

  }

  return (
    <>
      <div className="min-h-screen overflow-y-hidden crt crt-flicker">

        {/* Chat section */}
        <div className="border-5 p-3 mt-10 h-[500px] mx-5 border-green-400 overflow-auto no-scrollbar">

          {/* Eliza's Response */}
          {messages.map((msg, index) => (
            <div className="flex items-center" key={index}>
              <span className="text-2xl">{">"}</span>
              <div>
                {msg.message}
              </div>
            </div>
          ))}

          {/* User's Response */}
          <div className="flex items-center">
            <span className="text-2xl">{">"}</span>
            <input className="outline-none w-12/12" onChange={(e) => (setUserInput(e.target.value))} value={UserInput} onKeyDown={handleResponse} />
          </div>

        </div>

        {/* About Me section */}
        <div className="w-4/12 mx-auto mt-5 flex flex-col items-center">
          <p>
            *************************************************
          </p>
          <p className="my-3 text-center">
            ELIZA is an early natural language processing computer program
            developed from 1964 to 1967 at MIT by {" "}
            <a className="italic font-bold underline"
              href="https://en.wikipedia.org/wiki/Joseph_Weizenbaum"
              target="_blank"
            >Joseph Weizenbaum</a> {" "}
            this is a her morden reincarnation. Made using gemini api {" "}
            <a className="italic font-bold underline"
              href="https://github.com/Muksit86"
              target="_blank"
            >Me</a
            >
          </p>
          <p>
            *************************************************
          </p>
        </div>


      </div>
    </>
  )
}

export default App

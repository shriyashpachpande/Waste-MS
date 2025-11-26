import React, {  useState, createContext } from "react";

const NotificationContext = createContext();
export default NotificationContext;

// Provider for notifications
export const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const addMessage = (msg, type = "info") => {
    setMessages((prev) => [...prev, { msg, type, id: Date.now() }]);
    setTimeout(() => setMessages((prev) => prev.slice(1)), 5000);
  };
  return (
    <NotificationContext.Provider value={{ addMessage }}>
      {children}
      <div className="fixed top-2 right-2 z-50 flex flex-col items-end gap-2">
        {messages.map((m) => (
          <div key={m.id}
            className={`shadow-xl p-3 rounded-lg font-medium ${
              m.type === "error" ? "bg-red-400 text-white" :
              m.type === "success" ? "bg-green-400 text-white" :
              "bg-green-50 text-green-700"
            }`}>
            {m.msg}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Usage: const { addMessage } = useContext(NotificationContext);
// addMessage("Welcome!", "success");

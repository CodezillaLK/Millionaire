import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QuizProvider } from "./contexts/quizContext.tsx";
import { ConfigProvider, App as AntdApp } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          borderRadiusLG: 6,
          fontFamily: "Alexandria",
          fontSize: 16,
          lineWidth: 2,
          colorError: "#f87171"
        },
        components: {
          Input: {
            paddingBlockLG: 12,
            paddingInlineLG: 24,
            activeBorderColor: "#FCAE31",
            hoverBorderColor: "#eea52f",
          },
        },
      }}
    >
      <AntdApp>
        <QuizProvider>
          <App />
        </QuizProvider>
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>,
);

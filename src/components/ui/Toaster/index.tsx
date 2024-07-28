import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type PropsType = {
  variant?: string;
  message?: string;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ToasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Error",
    icon: "bx-check-circle",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
  warning: {
    title: "Warning",
    icon: "bx-check-circle",
    color: "#f9e3a2",
    barColor: "#e9b949",
  },
};

const Toaster = (props: PropsType) => {
  const { variant = "success", message, setToaster } = props;
  const [lenghtBar, setLenghtBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLenghtBar((prev) => prev - 0.14);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div
      className={`fixed bottom-10 left-[50%] -translate-x-1/2 z-50 flex shadow-xl border border-gray-300 p-7 pb-8 rounded-lg overflow-hidden ${variant}`}
    >
      <div className="flex justify-center items-center gap-3">
        <div>
          <i
            className={`bx ${ToasterVariant[variant].icon} text-4xl`}
            style={{ color: `${ToasterVariant[variant].barColor}` }}
          />
        </div>
        <div className="min-w-52">
          <p className="font-bold mb-[2px]">{ToasterVariant[variant].title}</p>
          <p>{message}</p>
        </div>
        <i
          className="bx bx-x absolute top-3 right-2 cursor-pointer text-2xl"
          onClick={() => setToaster({})}
        />
      </div>

      <div
        className="w-full h-[6px] absolute bottom-0 left-0"
        style={{ backgroundColor: `${ToasterVariant[variant].color}` }}
      >
        <div
          className="h-full"
          style={{
            width: `${lenghtBar}%`,
            backgroundColor: `${ToasterVariant[variant].barColor}`,
          }}
        />
      </div>
    </div>
  );
};

export default Toaster;

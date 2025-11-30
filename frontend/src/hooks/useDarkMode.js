import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState(localStorage.getItem("dark") === "true");

  useEffect(() => {
    localStorage.setItem("dark", dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return [dark, setDark];
}

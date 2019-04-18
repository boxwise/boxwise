import { useEffect } from "react";
import { useRouter } from "../hooks/routing";

export default ({ children }) => {
  const { location } = useRouter();
  useEffect(() => {
    if (!(location.state && location.state.resetScroll === false)) {
      window.scrollTo(0, 0);
    }
  });

  return children;
};

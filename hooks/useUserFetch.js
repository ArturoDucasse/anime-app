import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const { getItem, setItem } = useAsyncStorage("user");

const useUserFetch = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      const user = JSON.parse(response);
      setUser(user);
    };
    fetchUser();
  }, []);

  return [user, setUser, getItem, setItem];
};

export default useUserFetch;

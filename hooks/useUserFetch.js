import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const { getItem } = useAsyncStorage("user");

const useUserFetch = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getItem();
      const user = JSON.parse(response);
      setUser(user);
    };
    fetchUser();
  }, []);

  return [user, setUser];
};

export default useUserFetch;

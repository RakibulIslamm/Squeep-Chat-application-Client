import useListenAuth from "./Hooks/useListenAuth";
import Layout from "./Layout/Layout";
import PageLoader from "./utils/Loader/PageLoader";
import { io } from 'socket.io-client'

function App() {
  const socket = io("http://localhost:5000");
  socket.on("connect", () => {
    console.log(socket.id);
  });
  const authChecked = useListenAuth();
  return (
    !authChecked ? <PageLoader authChecked={authChecked} /> : <Layout />
  );
}

export default App;

import useListenAuth from "./Hooks/useListenAuth";
import Layout from "./Layout/Layout";
import PageLoader from "./utils/Loader/PageLoader";
import { socket } from "./utils/Socket.io/socket";
import 'skeleton-elements/css'

function App() {
  socket.on("connect", () => {
    console.log(socket.id);
  });
  const authChecked = useListenAuth();
  return (
    !authChecked ? <PageLoader authChecked={authChecked} /> : <Layout />
  );
}

export default App;

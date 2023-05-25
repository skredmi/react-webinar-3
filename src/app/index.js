import { Routes, Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Card from './card';
import "./index.css";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/card/:id" element={<Card />} />
    </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;

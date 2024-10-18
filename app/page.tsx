// pages/index.js
//import Navbar from "../app/components/Navbar";
import App from "../app/Components/App";

export default function Home() {
  return (
    <div>
      <div> 
        {/*<Navbar />*/}
        <div className="text-left text-4xl font-bold ml-20 mt-2">
          Espacio de trabajo
        </div>
        <br></br>
        <App />
        <main>
          {/* Contenido de la página */}
        </main>
      </div>
    </div>
  );
}

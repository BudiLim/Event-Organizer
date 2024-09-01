import Event from "@/components/Event";
import Hero from "@/components/Hero";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <main>
      <Hero/>
      <Event/>
      <ToastContainer/>
    </main>
  )
}

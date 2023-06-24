import "./App.css";
import Form from "./components/Form/index";
import Show from "./components/show/Show";
import Layout from "./components/layout/index";

function App() {
  return (<>
    <div className="container">
      <Layout>
      <Show/>
      <Form/>

      </Layout>
    </div>
  </>)
}

export default App;

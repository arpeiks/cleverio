import Form from "@/containers/form";
import Settings from "@/containers/settings";

const Home = () => {
  return (
    <main className="antialiased flex items-center justify-center min-h-screen p-4 sm:p-6">
      <Form />
      <Settings />
    </main>
  );
};

export default Home;

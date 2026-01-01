import FileDropArea from "@/components/FileDropArea";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      <Header />
      <FileDropArea />
    </div>
  );
}

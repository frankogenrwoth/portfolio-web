import HomePage from "@/components/home-page";
import { getAllPosts } from "@/lib/blog";

export default function Page() {
  const posts = getAllPosts();
  return <HomePage posts={posts} />;
}

import HomePage from "@/components/home-page";
import { getAllPosts } from "@/lib/blog";
import { getAllWorks } from "@/lib/works";

export default function Page() {
  const posts = getAllPosts();
  const works = getAllWorks();
  return <HomePage posts={posts} works={works} />;
}

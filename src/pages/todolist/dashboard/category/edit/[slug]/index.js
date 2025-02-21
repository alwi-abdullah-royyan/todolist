import CategoryForm from "@/components/organism/CategoryForm";
import { useRouter } from "next/router";

const EditCategory = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="container mx-auto p-6">
      <CategoryForm slug={slug} />
    </div>
  );
};

export default EditCategory;

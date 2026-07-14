import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import Card from "../components/Card";
import CardSkeleton from "../components/skeleton/CardSkeleton";

const Category = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("blogData.category", "==", categoryName),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        const snapshot = await getDocs(q);
        setBlogs(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='mx-auto max-w-7xl'>
      <h1 className='my-12 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-center text-5xl font-bold text-transparent'>
        Articles related to:{" "}
        <span className='bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text font-extrabold capitalize text-transparent'>
          {categoryName}
        </span>
      </h1>

      <div className='mx-auto mt-12 grid w-[80%] grid-cols-1 gap-5 md:w-[95%] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : blogs?.length > 0 ? (
          blogs.map((blog, i) => <Card key={i} id={blog.id} blog={blog.data} />)
        ) : (
          <p className='mt-24 text-center text-4xl font-extrabold'>No Article found</p>
        )}
      </div>
    </div>
  );
};

export default Category;

"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Result {
  data: Item[];
}

interface Item {
  age: number;
  name: string;
}
let totalTime: number = 0;
const fetchData = async () => {
  let initialTime = performance.now();
  const res = await fetch("http://127.0.0.1:5000/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
    },
  });
  let finalTime = performance.now();
  totalTime += finalTime - initialTime;
  const result: Result = await res.json();
  console.log(result?.data);
  return result?.data;
};

export default function Hello() {
  const [data, setData] = useState<Item[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      fetchData().then((res) => {
        setLoading(false);
        setData(res);
      });
    }
  });

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {loading && <p>Loading...</p>}
        {!loading && data?.map((item: Item) => <p>{item?.age}</p>)}
        {!loading && <p>Time: {totalTime} ms</p>}
      </div>
    </main>
  );
}

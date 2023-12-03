"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const fetchData = async () => {
  const res = await fetch("http://127.0.0.1:5000/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  console.log(result);
  return result?.data;
};

export default function Hello() {
  const [data, setData] = useState("");
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
        <p>{data}</p>
      </div>
    </main>
  );
}

import { useState } from "react";

type ExcuseOptions = {
  vibe?: string;
  howBroke?: number;
  blame?: string;
  banking?: string;
};

export function useExcuse() {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateExcuse = async (options: ExcuseOptions) => {
    setLoading(true);
    setExcuse(null);
    setError(null);
  
    try {
        const res = await fetch("/api/excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });
  
      const data = await res.json();
      setExcuse(data.excuse);
    } catch (err) {
      setError("Failed to get excuse.");
    } finally {
      setLoading(false);
    }
  };

  return { excuse, loading, error, generateExcuse };
}
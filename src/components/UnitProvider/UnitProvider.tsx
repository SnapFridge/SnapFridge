"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type Unit = "metric" | "imperial";

const UnitContext = createContext<
  | {
      unit: Unit;
      toggleUnit: () => void;
    }
  | undefined
>(undefined);

export function UnitProvider({ children }: PropsWithChildren) {
  const [unit, setUnit] = useState<Unit>("imperial");

  const toggleUnit = useMemo(() => {
    return () => {
      setUnit((unit) => (unit === "metric" ? "imperial" : "metric"));
    };
  }, []);

  const value = useMemo(() => {
    return {
      unit,
      toggleUnit,
    };
  }, [unit, toggleUnit]);

  return <UnitContext value={value}>{children}</UnitContext>;
}

export function useUnit(): [Unit, () => void] {
  const { unit, toggleUnit } = useContext(UnitContext)!;
  return [unit, toggleUnit];
}

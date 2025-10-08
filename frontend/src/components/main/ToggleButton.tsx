'use client';

import { useEffect, useState } from "react";
import { type FiltersType } from "../FilterMainPage";

type ToggleButtonProps = {
  name: string;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  value1: keyof FiltersType;
  value2: string | boolean;
  id?: string;
  group?: string;
  value3? : string;
};

// 💡 Define a strongly typed group store
type GroupCallback = (openedId: string) => void;
const toggleGroups = new Map<string, Set<GroupCallback>>();

const ToggleButton = ({
  name,
  setFilters,
  value1,
  value2,
  id,
  group,
  value3
}: ToggleButtonProps) => {
  const [isOn, setIsOn] = useState(false);

  // Register this toggle in its group
  useEffect(() => {
    if (!group) return;

    if (!toggleGroups.has(group)) {
      toggleGroups.set(group, new Set<GroupCallback>());
    }

    const groupSet = toggleGroups.get(group)!;
    const callback: GroupCallback = (openedId) => {
      if (openedId !== id) setIsOn(false);
    };

    groupSet.add(callback);

    return () => {
      groupSet.delete(callback);
      if (groupSet.size === 0) toggleGroups.delete(group);
    };
  }, [group, id]);

  // Notify others in same group
  const notifyGroup = () => {
    if (!group) return;
    const groupSet = toggleGroups.get(group);
    groupSet?.forEach((cb) => cb(id!));
  };

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);

    if (newState) {
      notifyGroup(); // Close others in same group
      setFilters((prev) => ({ ...prev, [value1]: value2 }));

      if(value3){
        setFilters((prev)=>({...prev, price: {min : value2 , max : value3}}))
      }
    } else {
      // Reset or clear the filter for this field
      setFilters((prev) => ({ ...prev, [value1]: false }));
    }
  };

  return (
    <div className="w-full flex gap-4 items-center">
      <div
        onClick={handleToggle}
        className={`cursor-pointer relative w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
          isOn ? "bg-primary" : "bg-[#E7E6E7]"
        }`}
      >
        <div
          className={`absolute ${isOn ? "right-1" : "left-1"} w-4 h-4 bg-white rounded-full transition-all`}
        />
      </div>
      <span className="font-semibold">{name}</span>
    </div>
  );
};

export default ToggleButton;

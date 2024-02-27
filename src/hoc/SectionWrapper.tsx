import React from "react";
import { styles } from "../styles";

export default function SectionWrapper(
  Component: React.ComponentType,
  idName: string
) {
  const WrappedComponent = () => (
    <div className={`${styles.padding} max-w-7xl mx-auto  z-0`}>
      <span id={idName}>&nbsp;</span>
      <Component />
    </div>
  );
  return WrappedComponent;
}

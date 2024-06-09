import React, { useRef, RefObject } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { useMatrixEffect } from "../hooks/useMatrixEffect";
import { useMatrixData } from "../utils/matrix";

type Props = {
  parentRef: RefObject<HTMLElement>;
  className?: string;
};

const MatrixEffect: React.FC<Props> = ({ parentRef, className }: Props) => {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const {
    drops,
    stageComponentHeight,
    stageComponentWidth,
    characters,
    fontSize,
  } = useMatrixData(parentRef);

  useMatrixEffect({
    layerRef,
    characters,
    drops,
    fontSize,
    stageComponentWidth,
    stageComponentHeight,
    stageRef,
  });

  return (
    <Stage
      width={stageComponentWidth}
      height={stageComponentHeight}
      ref={stageRef}
      className={className}
    >
      <Layer ref={layerRef} />
    </Stage>
  );
};

export default MatrixEffect;

import { RefObject } from "react";
import useSize from "../hooks/useSize";

type ReturnProps = {
  stageComponentWidth: number;
  stageComponentHeight: number;
  drops: number[];
  characters: string;
  fontSize: number;
};

const characters: string =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const useMatrixData = (
  parentRef: RefObject<HTMLElement>
): ReturnProps => {
  const { width: screenWidth, height: screenHeight } = useSize(parentRef);
  const fontSize: number = (screenWidth || 0) > 764 ? 16 : 14;
  const stageComponentWidth: number = screenWidth || 300;
  const stageComponentHeight: number = screenHeight || 300;
  const columns: number = Math.floor(stageComponentWidth / fontSize);

  return {
    stageComponentWidth,
    stageComponentHeight,
    drops: Array(columns).fill(0),
    characters,
    fontSize,
  };
};

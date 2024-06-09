import Konva from "konva";
import { RefObject, useEffect } from "react";

type Props = {
  layerRef: RefObject<Konva.Layer>;
  stageRef: RefObject<Konva.Stage>;
  characters: string;
  drops: number[];
  fontSize: number;
  stageComponentWidth: number;
  stageComponentHeight: number;
};

const garbageCollector = (layer: Konva.Layer, width: number) => {
  const limit = width > 1200 ? 10000 : 5000;
  if (layer.children.length > limit) {
    layer.children.forEach((child, index) => {
      if (index < 500) child.destroy();
    });
  }
};

export const useMatrixEffect = ({
  layerRef,
  stageRef,
  characters,
  drops,
  fontSize,
}: Props) => {
  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      if (!layerRef.current || !stageRef.current) return;

      const layer = layerRef.current;
      const stage = stageRef.current;

      const fade = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: "rgba(0, 0, 0, 0.13)",
      });

      layer.add(fade);

      for (let i = 0; i < drops.length; i++) {
        const text: string = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        const x: number = i * fontSize;
        const y: number = drops[i] * fontSize;

        const konvaText = new Konva.Text({
          x,
          y,
          text,
          fontSize,
          fill: "#0F0",
          fontFamily: "monospace",
          opacity: 1,
        });

        layer.add(konvaText);

        if (y > stage.height() && Math.random() > 0.99) {
          drops[i] = 0;
        }

        drops[i]++;

        garbageCollector(layer, stage.width());
      }

      layer.batchDraw();
    }, 50);

    return () => clearInterval(interval);
  }, [characters, drops, fontSize, layerRef, stageRef]);
};
